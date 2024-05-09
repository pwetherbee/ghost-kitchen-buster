/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup.ts":
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/
/***/ (function() {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Ensure the element exists and is of correct type
const checkPageButton = document.getElementById("checkPage");
if (checkPageButton) {
    // Add event listener with explicit typing
    checkPageButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tabs = yield chrome.tabs.query({
                active: true,
                currentWindow: true,
            });
            if (tabs.length > 0) {
                const tab = tabs[0];
                // Check if tab.id is available (it should always be for normal tabs)
                if (tab.id != null) {
                    yield chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ["dist/content-script.js"],
                    });
                }
                else {
                    console.error("Failed to retrieve tab id");
                }
            }
            else {
                console.error("No active tab found");
            }
        }
        catch (error) {
            console.error("Error executing script in tab", error);
        }
    }));
}
else {
    console.error("Button element not found");
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/popup.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBbUQ7QUFDbkQsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUU3RCxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBQ3BCLDBDQUEwQztJQUMxQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQVMsRUFBRTtRQUNuRCxJQUFJLENBQUM7WUFDSCxNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNuQyxNQUFNLEVBQUUsSUFBSTtnQkFDWixhQUFhLEVBQUUsSUFBSTthQUNwQixDQUFDLENBQUM7WUFDSCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEIscUVBQXFFO2dCQUNyRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ25CLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7d0JBQ25DLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFO3dCQUN6QixLQUFLLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztxQkFDbEMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7cUJBQU0sQ0FBQztvQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQzdDLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEQsQ0FBQztJQUNILENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQztLQUFNLENBQUM7SUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDNUMsQ0FBQzs7Ozs7Ozs7VUVoQ0Q7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Nocm9tZS8uL3NyYy9wb3B1cC50cyIsIndlYnBhY2s6Ly9jaHJvbWUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRW5zdXJlIHRoZSBlbGVtZW50IGV4aXN0cyBhbmQgaXMgb2YgY29ycmVjdCB0eXBlXG5jb25zdCBjaGVja1BhZ2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoZWNrUGFnZVwiKTtcblxuaWYgKGNoZWNrUGFnZUJ1dHRvbikge1xuICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgd2l0aCBleHBsaWNpdCB0eXBpbmdcbiAgY2hlY2tQYWdlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRhYnMgPSBhd2FpdCBjaHJvbWUudGFicy5xdWVyeSh7XG4gICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgY3VycmVudFdpbmRvdzogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHRhYnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB0YWIgPSB0YWJzWzBdO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRhYi5pZCBpcyBhdmFpbGFibGUgKGl0IHNob3VsZCBhbHdheXMgYmUgZm9yIG5vcm1hbCB0YWJzKVxuICAgICAgICBpZiAodGFiLmlkICE9IG51bGwpIHtcbiAgICAgICAgICBhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuICAgICAgICAgICAgdGFyZ2V0OiB7IHRhYklkOiB0YWIuaWQgfSxcbiAgICAgICAgICAgIGZpbGVzOiBbXCJkaXN0L2NvbnRlbnQtc2NyaXB0LmpzXCJdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcmV0cmlldmUgdGFiIGlkXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gYWN0aXZlIHRhYiBmb3VuZFwiKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGV4ZWN1dGluZyBzY3JpcHQgaW4gdGFiXCIsIGVycm9yKTtcbiAgICB9XG4gIH0pO1xufSBlbHNlIHtcbiAgY29uc29sZS5lcnJvcihcIkJ1dHRvbiBlbGVtZW50IG5vdCBmb3VuZFwiKTtcbn1cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvcG9wdXAudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==