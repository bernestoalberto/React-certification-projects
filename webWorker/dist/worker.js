"use strict";
onmessage = function (event) {
    console.log(event.data);
    if (event.data === "start") {
        let count = 0;
        for (let index = 0; index < 1000000000; index++) {
            count += index;
        }
        postMessage(count);
    }
};
//# sourceMappingURL=worker.js.map