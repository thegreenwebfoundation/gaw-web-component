import { LitElement, css, html } from "lit";
import { zones } from "./helpers/zones";

export class GawInfoBar extends LitElement {
  static get properties() {
    return {
      location: { type: String },
      gridLevelText: { type: String },
      learnMoreLink: { type: String },
      autoMode: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.location = "Location unknown";
    this.circleFill = "#B0AA9C";
    this.autoMode = true;
    this.gridLevelText = "Your local grid: Data unavailable";
    this.ignoreCookie = "gaw-ignore";
    this.ignoreCookieMaxAge = "Session";
    this.manualVersion = "low";
    this.learnMoreLink = "#";
    this.addEventListener("load", this._init());
  }

  render() {
    return html`
      <div>
        <div class="holder">
          <div class="divider">
              <svg
                  class="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>
          </div>
          <p>${this.location}</p>
        </div>
        <div class="holder">
          <div class="divider">
            <svg
              class="icon"
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="40" fill="${this.circleFill}" />
            </svg>
          </div>
            <div class="split-content">
              <p>${this.gridLevelText}</p>
              <div class="popover__wrapper" @click="${this._togglePopoverClick}">
              <svg
                  class="icon popover__title"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            />
                          </svg>
              </div>
                          <div class="popover__content">
                              <p class="popover__message">
                                  This site changes its design based on the quantity of fossil fuels on the grid to stay inside a carbon budget at all times. <a href="${this.learnMoreLink}">Learn more</a>
                              </p>
                          </div>
            </div>
          </div>
        </div>
        <div id="gaw-info-controls">
          <div class="holder">
            <div class="divider" id="gaw-info-bar-auto">
              <p>Grid-aware Mode</p>
              <label>
                <input
                  type="checkbox"
                  ?checked="${this.autoMode}"
                  id="gaw-info-bar-settings-auto-toggle"
                  @change="${this._handleAutoToggleChange}"
                />
                Auto
              </label>
            </div>
            <div id="gaw-info-bar-manual" class="spaced">
              <button id="gaw-info-bar-settings-manual-low" ?disabled="${this.autoMode}" @click=${this._handleManualModeChange} ?data-active=${this._checkIsActive("low")}>
                Low
              </button>
              <button id="gaw-info-bar-settings-manual-moderate" ?disabled="${this.autoMode}" @click=${this._handleManualModeChange} ?data-active=${this._checkIsActive("moderate")}>
                Moderate
              </button>
              <button id="gaw-info-bar-settings-manual-high" ?disabled="${this.autoMode}" @click=${this._handleManualModeChange} ?data-active=${this._checkIsActive("high")}>
                High
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _formatLocation(location) {
    if (!location) return "Location unknown";
    try {
      let locationString = location.toString();
      const locationObject = zones[locationString];
      if (locationObject.shortName) {
        return locationObject.shortName;
      } else if (locationObject.zoneName) {
        return locationObject.zoneName;
      } else {
        return location.toString();
      }
    } catch (e) {
      console.error(e);
      return "Location unknown";
    }
  }

  /**
   * Handles changes to the auto toggle checkbox
   * @param {Event} event - The change event
   * @private
   */
  _handleAutoToggleChange(event) {
    this.autoMode = event.target.checked;

    if (this.autoMode) {
      document.cookie = `${this.ignoreCookie}=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `gaw-manual-view=low; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      window.location.reload();
    } else {
      document.cookie = `${this.ignoreCookie}=true; path=/; max-age=${this.ignoreCookieMaxAge}`;
      document.cookie = `gaw-manual-view=low; path=/; max-age=${this.ignoreCookieMaxAge}`;
      window.location.reload();
    }
  }

  /**
   * Handles changes to the manual mode buttons
   * @param {Event} event - The click event
   * @private
   */
  _handleManualModeChange(event) {
    const mode = event.target.id.split("-").pop();
    document.cookie = `gaw-manual-view=${mode}; path=/; max-age=${this.ignoreCookieMaxAge}`;
    window.location.reload();
  }

  _checkIsActive(mode) {
    return this._getCookie("gaw-manual-view") === mode;
  }

  /**
   * Checks if a cookie exists
   * @param {string} name - The name of the cookie to check
   * @returns {boolean} - True if the cookie exists, false otherwise
   * @private
   */
  _hasCookie(name) {
    return document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith(`${name}=`));
  }

  _getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const key = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      if (key === name) {
        return decodeURIComponent(cookie.substring(eqPos + 1));
      }
    }
    return null;
  }

  /**
   * Toggle the data-clicked attribute on the popover wrapper element
   * @param {Event} event - The click event
   * @private
   */
  _togglePopoverClick(event) {
    const element = event.currentTarget;
    if (element.hasAttribute("data-clicked")) {
      element.removeAttribute("data-clicked");
    } else {
      element.setAttribute("data-clicked", "");
    }
  }

  _init() {
    const level = this.dataset.gawLevel || this.level;
    this.location = this.dataset.gawLocation || this.location;
    this.ignoreCookieMaxAge =
      this.dataset.ignoreCookieMaxAge || this.ignoreCookieMaxAge;
    this.ignoreCookie = this.dataset.ignoreCookie || this.ignoreCookie;
    this.learnMoreLink = this.dataset.learnMoreLink || this.learnMoreLink;

    try {
      const locationString = this._formatLocation(this.location);
      this.location = locationString;
      // if (this.location?.toLowerCase() === "location unknown") {
      //   this.autoMode = false;
      // }
    } catch (e) {
      console.log("Error formatting location:", e);
    }

    try {
      if (level === "low") {
        this.circleFill = "#86CA7A";
        this.gridLevelText = "Your local grid: Cleaner than average.";
      } else if (level === "moderate") {
        this.circleFill = "#ECA75D";
        this.gridLevelText = "Your local grid: Around average emissions.";
      } else if (level === "high") {
        this.circleFill = "#E4A08A";
        this.gridLevelText = "Your local grid: Dirtier than average.";
      }
    } catch (e) {
      console.log(e);
    }

    // Check if the ignore cookie is set and update autoMode accordingly
    if (this._hasCookie(this.ignoreCookie)) {
      this.autoMode = false;
    }
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        font-family: monospace;
        /* font-size: 16px; */
        max-width: 1920px;
        text-transform: uppercase;
        gap: 0.5rem;
        color: inherit;
        /* flex-wrap: wrap-reverse; */
      }

      :host > div {
        font-size: 0.75em;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      :host > .wrapper {
        max-width: 600px;
      }

      .holder {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid #b8bcb5;
      }

      .holder > * {
        padding-block: 0.25rem;
        padding-inline: 0.75rem;
      }

      .icon {
        width: 1.5em;
        height: 1.5em;
        position: relative;
      }

      div.divider {
        position: relative;
        display: flex;
        align-items: center;
      }

      div.divider:after {
        content: "";
        position: absolute;
        height: calc(100% - 0.8em);
        width: 1px;
        background-color: #b8bcb5;
        top: 0.4em;
        right: -0.25em;
      }

      .split-content {
        postion: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        /* justify-content: center; */
      }

      .split-content > * {
        padding-inline: 0.25rem;
        position: relative;
      }

      .divider:has(input) {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }

      div.divider:has(input):after {
        height: calc(100% - 1.5rem);
        top: 0.75rem;
      }

      .spaced {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }

      button {
        background: none;
        border: none;
        font-family: inherit;
      }

      label:has(input) {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      :host
        > div:has(+ #gaw-info-controls label > input:not([checked]))
        > .holder {
        display: none;
      }

      button:not(:disabled) {
        background: none;
        border: none;
        font-family: inherit;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
      }

      button#gaw-info-bar-settings-manual-low {
        --activeButtonBackgroundColor: #86ca7a;
      }

      button#gaw-info-bar-settings-manual-moderate {
        --activeButtonBackgroundColor: #eca75d;
      }

      button#gaw-info-bar-settings-manual-high {
        --activeButtonBackgroundColor: #e4a08a;
      }

      button:not(:disabled)[data-active] {
        background: var(--activeButtonBackgroundColor);
      }

      .popover__wrapper {
        position: relative;
        cursor: pointer;
      }

      .popover__content {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        /* left: -150px; */
        right: 5em;
        transform: translate(0, 10px);
        background-color: #fff;
        border: 1px solid #ccc;
        /* padding: 1.5rem; */
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        width: auto;
      }
      /* .popover__content:before {
        position: absolute;
        z-index: -1;
        content: "";
        right: calc(50% - 10px);
        top: -8px;
        border-style: solid;
        border-width: 0 10px 10px 10px;
        border-color: transparent transparent #bfbfbf transparent;
        transition-duration: 0.3s;
        transition-property: transform;
      } */
      .popover__content {
        transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
      }

      .popover__wrapper:hover + .popover__content,
      .popover__wrapper:focus + .popover__content,
      .popover__wrapper:focus-within + .popover__content,
      .popover__wrapper[data-clicked] + .popover__content {
        z-index: 10;
        opacity: 1;
        visibility: visible;
        transform: translate(0, 0);
      }
      .popover__message {
        text-align: center;
      }
    `;
  }
}
