import {formatDuration, formatNumber, avg, aggregateTaskCostFields} from './utils';

const lightboxHeight = 250;
export const API_URL = window.location.hostname === "www.tailor-ip.com" ? "https://www.tailor-ip.com/_functions" : "https://www.tailor-ip.com/_functions-dev";

export const setZoomConfig = (gantt) => {
    const zoomConfig = {
          trigger: 'wheel',
          useKey: 'altKey',
          levels: [
            {
              name:"day",
              scale_height: 27,
              min_column_width:80,
              scales:[
                  {unit: "day", step: 1, format: "%d %M"}
              ]
            },
            {
               name:"week",
               scale_height: 50,
               min_column_width:50,
               scales:[
                {unit: "week", step: 1, format: function (date) {
                 var dateToStr = gantt.date.date_to_str("%d %M");
                 var endDate = gantt.date.add(date, -6, "day");
                 var weekNum = gantt.date.date_to_str("%W")(date);
                 return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
                 }},
                 {unit: "day", step: 1, format: "%j %D"}
               ]
             },
             {
               name:"month",
               scale_height: 50,
               min_column_width:120,
               scales:[
                  {unit: "month", format: "%F, %Y"},
                  {unit: "week", format: "Week #%W"}
               ]
              },
              {
               name:"quarter",
               height: 50,
               min_column_width:90,
               scales:[
                {unit: "month", step: 1, format: "%M"},
                {
                 unit: "quarter", step: 1, format: function (date) {
                  var dateToStr = gantt.date.date_to_str("%M");
                  var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                  return dateToStr(date) + " - " + dateToStr(endDate);
                 }
               }
              ]},
              {
                name:"year",
                scale_height: 50,
                min_column_width: 30,
                scales:[
                  {unit: "year", step: 1, format: "%Y"}
              ]}
          ]
      }
      gantt.ext.zoom.init(zoomConfig);
      }

const initialColumns = [
  {
    "name": "text",
    "tree": true,
    "width": 156,
    "resize": true
  },
  {
    "name": "start_date",
    "align": "center",
    "resize": true,
    "width": 90
  },
  {
    "name": "duration",
    "align": "center",
    "resize": true,
    "width": 90,
    template: function (task) {
        return formatDuration(task.duration);
  }},
    {
    "name": "totalCost",
    "align": "center",
    label: "Cost",
    "width": 90,
    template: function (task) {
        const cost = parseFloat(avg(task.minCost, task.maxCost)) + parseFloat(aggregateTaskCostFields(task))
        return parseFloat(cost) > 0 ? formatNumber(cost) + '$' : '';
  }},
  {
    "name": "add",
    "width": 44,
    "min_width": 44,
    "max_width": 44
  }
];

const setColumns = (gantt, allowEdit) => {
    const columns = [].concat(initialColumns);
    if (!allowEdit) {
        columns.pop();
        }

    gantt.config.columns = columns;
 }

export const initGanttDateFormat = (gantt) => {
    gantt.config.date_format     = "%Y-%m-%d";
    gantt.config.date_format = "%Y-%m-%d";
    const cfg = gantt.config;
    const strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);
    gantt.templates.parse_date = (date = '') => strToDate(date.slice(0, 10));
    gantt.templates.grid_date_format = (date, column) => gantt.date.date_to_str("%d/%m/%Y")(date);
}

export const initLightboxButtons = (gantt, editAllowed) => {
    gantt.attachEvent("onGanttReady", () => {
          gantt.config.buttons_left = [];
          gantt.config.buttons_right = [];
          gantt.locale.labels.gantt_cancel_btn = "Close";
    });
}

const _getSection = (type, edit = false) => {
    const typesMap = {
        task: {
            view: 'taskDetails',
            edit: 'editTaskDetails',
        },
        project: {
            view: 'folderDetails',
            edit: 'editFolderDetails',
        },
        milestone: {
            view: 'milestoneDetails',
            edit: 'editMilestoneDetails',
            height: 200,
        },
    }

    const mapTo = typesMap[type];

    const template = [{
        "name": "lightbox",
        "height": mapTo.height ? mapTo.height : lightboxHeight,
        "type": "template",
        "map_to": edit ? mapTo.edit : mapTo.view
        }];

    return template;
}

export function initLightbox(gantt, editAllowed = false) {
    gantt.config.lightbox.sections = _getSection('task', editAllowed);
    gantt.config.lightbox.project_sections = _getSection('project', editAllowed)
    gantt.config.lightbox.milestone_sections = _getSection('milestone', editAllowed)
    gantt.locale.labels.section_lightbox = "";

    gantt.attachEvent("onBeforeLightbox", function(id) {
        const task = gantt.getTask(id);
        if (!task.taskDetails) {
            task.taskDetails = "<div id='task-details'/>"
            task.milestoneDetails = "<div id='milestone-details' class='snufkin'/>"
            task.folderDetails = "<div id='folder-details'/>"
        }
        return task;
    });

    gantt.attachEvent("onTaskCreated", function(task) {
        task['$new'] = true;
        gantt.addTask(task)
        return false;
    })

    gantt.attachEvent("onAfterTaskAdd", function(id, task) {
       if (!task.$new) return
       task.index = task.id;
       task.title = task.text;
       task.minCost = 0;
       task.maxCost = 0;
       task['$source'] = [];
       task.['$target'] = [];
       task['$new'] = false;
       gantt.showLightbox(id);
//       setTimeout(() => gantt.showLightbox(id), 0)
    });

}

const removeDefaultKeyShortcuts = (gantt) => {
    gantt.keys = {}
}

const setPlugins = (gantt) => {
    gantt.plugins({
        fullscreen: true,
        undo: true,
    });
//    gantt.config.auto_scheduling = true;
//    gantt.config.auto_scheduling_initial = false;
//    gantt.config.auto_scheduling_move_projects = true;
}

export const initConfig = (gantt, editAllowed = false) => {
    setZoomConfig(gantt);
    setPlugins(gantt);
    removeDefaultKeyShortcuts(gantt);
    setColumns(gantt, editAllowed);
    initGanttDateFormat(gantt);
    initLightbox(gantt)
    initLightboxButtons(gantt);
    gantt.init("ganttDiv");
}
