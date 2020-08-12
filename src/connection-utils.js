export function sendMsg(msg) {
  window.parent.postMessage(msg, "*");
}

//export
//window.onmessage = (event) => {
//                let data = event.data;
//                try {
//                    data = JSON.parse(event.data);
//                } catch(e) {
//                    console.log("can't parse data: " + event.data);
//                }
//                if(data && data.type) {
//                    if (data.type === 'fetch') {
//                        fetchData(data.id);
//                    }
//                    if (data.type === 'data') {
//                       parseData(data.data);
//                    }
//                    if (data.type === 'update') {
//                        updateGantt().then(function() {
//                        sendMsg('saved');
//                        });
//                    }
//                }
//            }