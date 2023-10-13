class Tab {
  $switchWrapper: HTMLElement;
  $switch: HTMLElement;
  $switchBoxes: NodeListOf<HTMLElement>;
  $switchBoxesWrapper: HTMLElement;
  $switchValue: HTMLInputElement;
  $switchTabs: NodeListOf<HTMLElement>

  constructor(el: HTMLElement) {
    this.$switchWrapper = el;
    this.$switch = this.$switchWrapper.querySelector(".tabs-list") as HTMLElement;
    this.$switchBoxes = this.$switchWrapper.querySelectorAll(".tabs-node");
    this.$switchBoxesWrapper = this.$switchWrapper.querySelector(".tabs-node-wrapper") as HTMLElement;
    this.$switchValue = this.$switch.querySelector(".tabs-value") as HTMLInputElement;
    this.$switchTabs = this.$switch.querySelectorAll(".tabs-item");
    this.setup();
    this.asyncHidden();
  }

  asyncHidden() {
    this.$switchBoxes.forEach(box => {
      setTimeout(() => {
        box.classList.add("tabs-hidden");
      }, 100);
    });
  }

  setup() {
    this.handleClick = this.handleClick.bind(this);
    this.$switchTabs.forEach(item => item.addEventListener("click", this.handleClick))

    if (this.$switchWrapper.classList.contains("_height-transition")) {
      let activeBox = Array.from(this.$switchBoxes).find(box => box.classList.contains("active"));
      this.$switchBoxesWrapper.style.height = activeBox ? `${activeBox.clientHeight}px` : 'auto';
    }
  }

  handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const $switchTabClicked = target.closest(".tabs-item") as HTMLElement;

    if ($switchTabClicked && !$switchTabClicked.classList.contains("active")) {
      this.$switchTabs.forEach(el => el.classList.remove("active"));
      $switchTabClicked.classList.add("active");
      this.$switchValue.value = $switchTabClicked.dataset.value || '';
    }

    this.$switchBoxes.forEach(box => {
      if ($switchTabClicked
          && !box.classList.contains("active")
          && box.dataset.boxId == $switchTabClicked.dataset.boxId
      ) {
        box.classList.add("active");

        if (this.$switchWrapper.classList.contains("_height-transition")) {
          this.$switchBoxesWrapper.style.height = `${box.clientHeight}px`;
        }

      } else if ($switchTabClicked && (box.dataset.boxId !== $switchTabClicked.dataset.boxId)) {
        box.classList.remove("active");
      }
    })

  }
}

export function tabs() {

  const tabsList = document.querySelectorAll(".tabs");

  tabsList && tabsList.forEach(el => {
    const tabs = new Tab(el as HTMLElement);
  });
}