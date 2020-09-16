import {formatDuration, formatNumber, avg, aggregateTaskCostFields} from './utils';

export const defaultColumns = [
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


export const inlineEditColumns = [
         {
           "name": "text",
           "tree": true,
           "width": 156,
           "resize": true,
           editor: {type: "text", map_to: "text"},
         },
         {
           "name": "start_date",
           "align": "center",
           "resize": true,
           "width": 90,
           editor: {type: "date", map_to: "start_date"}
          },
         {
           "name": "duration",
           "align": "center",
           "resize": true,
           "width": 90,
           editor: {type: "number", map_to: "duration", min:0},
           template: function (task) {
               return formatDuration(task.duration);
           },
         },
          {
            "name": "associateFee",
            label: "Associate Fee",
            "align": "center",
            "resize": true,
            "width": 90,
            editor: {type: "number", map_to: "associateFee", min:0},
            },
         {
           "name": "brokerageFee",
           label: "Brokerage Fee",
           "align": "center",
           "resize": true,
           "width": 90,
           editor: {type: "number", map_to: "brokerageFee", min:0},
           },
          {
           "name": "unidentifiedFee",
           label: "Unidentified Fee",
           "align": "center",
           "resize": true,
           "width": 90,
           editor: {type: "number", map_to: "unidentifiedFee", min:0},
           },
           {
           "name": "totalCost",
           "align": "center",
           label: "Total Cost",
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