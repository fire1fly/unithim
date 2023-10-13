export function mainTabs() {

  const tabs = document.querySelectorAll(".tabs-item") as NodeListOf<HTMLElement>;
  const TIMEOUT = 5000;

  function tabsSwitcher() {
    tabs.forEach((item, index) => {
      setTimeout(item => {
        item.dispatchEvent(new Event("click"))
      }, TIMEOUT * index, item);
    });
  }

  tabsSwitcher();

  setInterval(() => {
    tabsSwitcher();
  }, TIMEOUT * tabs.length);
}