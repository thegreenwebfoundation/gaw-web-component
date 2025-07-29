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
    this.ignoreCookieMaxAge = "84600";
    this.manualVersion = "low";
    this.learnMoreLink = "#";
    this.defaultView = "low";
    this.views = ["low", "moderate", "high"];
    this.popoverText =
      "This site changes its design based on the quantity of fossil fuels on your nearest energy grid.";
    this.addEventListener("load", this._init());
  }

  render() {
    return html`
      <div class="outer-container">
        <div class="inner-container">
          <div class="holder grid-status">
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
            </div>
            <button id="expander" @click=${this._toggleExpandClick}>
              <span class="caret"></span>
            </button>
          </div>

          <div class="holder location">
            <div class="divider">
              <svg
                class="icon size-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
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

          <div id="gaw-info-controls" class="controls">
            <div class="holder">
              <div id="gaw-info-bar-manual" class="spaced divider">
                ${this.views.map(
                  (view) => html`
                    <button
                      id="gaw-manual-${view.toLowerCase()}"
                      ?disabled="${this.autoMode}"
                      @click=${this._handleManualModeChange}
                      ?data-active=${this._checkIsActive(view.toLowerCase())}
                    >
                      ${view}
                    </button>
                  `,
                )}
              </div>
              <div id="gaw-info-bar-auto">
                <p id="toggle-label-text">Grid-aware mode</p>
                <label class="toggle-switch" for="auto-toggle">
                  <input
                    type="checkbox"
                    ?checked="${this.autoMode}"
                    id="auto-toggle"
                    @change="${this._handleAutoToggleChange}"
                    @keydown="${this._handleToggleKeydown}"
                    aria-labelledby="toggle-label-text"
                    role="switch"
                    aria-checked="${this.autoMode ? "true" : "false"}"
                  />
                  <span class="toggle-slider" aria-hidden="true"></span>
                  <span class="toggle-label">Auto</span>
                </label>
                <div class="popover-wrapper">
                  <button popovertarget="mypopover">
                    <svg
                      class="icon size-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="popover-content" id="mypopover" popover>
              <p class="popover-message">
                ${this.popoverText}
                <a href="${this.learnMoreLink}">Learn more</a>
              </p>
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
      if (locationObject?.shortName) {
        return locationObject.shortName;
      } else if (locationObject?.zoneName) {
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

    // Update ARIA attributes
    event.target.setAttribute("aria-checked", this.autoMode ? "true" : "false");

    if (this.autoMode) {
      document.cookie = `${this.ignoreCookie}=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      this.views.forEach((view) => {
        document.cookie = `gaw-manual-view=${view.toLowerCase()}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
      document.cookie = `gaw-user-opt-in=true; path=/; max-age=${this.ignoreCookieMaxAge}; SameSite=lax`;
      window.location.reload();
    } else {
      document.cookie = `${this.ignoreCookie}=true; path=/; max-age=${this.ignoreCookieMaxAge}; SameSite=lax;`;
      document.cookie = `gaw-manual-view=${this.defaultView.toLowerCase()}; path=/; max-age=${this.ignoreCookieMaxAge}; SameSite=lax;`;
      document.cookie = `gaw-user-opt-in=false; path=/; max-age=${this.ignoreCookieMaxAge}; SameSite=lax;`;
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
    document.cookie = `gaw-manual-view=${mode}; path=/; max-age=${this.ignoreCookieMaxAge}; SameSite=lax;`;
    window.location.reload();
  }

  /**
   * Handles keyboard events for the toggle switch
   * @param {KeyboardEvent} event - The keyboard event
   * @private
   */
  _handleToggleKeydown(event) {
    // Handle spacebar and enter key to toggle the switch
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      this.autoMode = !this.autoMode;
      event.target.checked = this.autoMode;
      event.target.setAttribute(
        "aria-checked",
        this.autoMode ? "true" : "false",
      );
      this._handleAutoToggleChange({ target: event.target });
    }
  }

  _checkIsActive(mode) {
    const active = this._getCookieValue("gaw-manual-view") === mode;

    if (active) {
      return true;
    }

    if (!this._hasCookie("gaw-manual-view")) {
      const isDefaultView = this.defaultView.toLowerCase() === mode;
      return isDefaultView;
    }

    return false;
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

  _getCookieValue(name) {
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

  _toggleExpandClick(event) {
    const element = event.currentTarget;
    if (element.hasAttribute("data-expand")) {
      element.removeAttribute("data-expand");
    } else {
      element.setAttribute("data-expand", "");
    }
  }

  _init() {
    const level = this.dataset.gawLevel || this.level;
    this.location = this.dataset.gawLocation || this.location;
    this.ignoreCookieMaxAge =
      this.dataset.ignoreCookieMaxAge || this.ignoreCookieMaxAge;
    this.ignoreCookie = this.dataset.ignoreCookie || this.ignoreCookie;
    this.learnMoreLink = this.dataset.learnMoreLink || this.learnMoreLink;
    this.popoverText = this.dataset.popoverText || this.popoverText;
    this.autoMode =
      this._getCookieValue("gaw-user-opt-in") === "false" ? false : true;
    this.defaultView = this.dataset.defaultView || this.defaultView;
    this.views =
      this.dataset.views?.split(",").map((view) => view.trim()) || this.views;

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
      .outer-container {
        container-type: inline-size;
        container-name: wrapper;
      }

      .inner-container {
        padding: 0.5rem 0;
        font-family: monospace;
        font-size: 0.8em;
        text-transform: uppercase;
        color: inherit;
        /* flex-wrap: wrap-reverse; */
        container-type: inline-size;
        display: grid;
        grid-template-areas:
          "location status"
          ". controls";
      }

      .inner-container:has(input[checked]) .controls {
        display: none;
      }

      .inner-container:has([data-expand]):has(input[checked]) .controls {
        display: flex;
      }

      .inner-container:has(input[checked]) #gaw-info-bar-manual {
        display: none;
      }

      #expander {
        margin-inline-start: auto;
      }

      .caret {
        transform: translateY(-50%);
        display: inline-block;
        height: 10px;
        position: relative;
        transition: 0.4s ease;
        transform: rotate(0);
        width: 13px;
        color: currentColor;
      }

      .caret:after,
      .caret:before {
        background-color: transparent;
        border-bottom: 9px solid currentColor;
        box-sizing: content-box;
        content: "";
        display: inline-block;
        height: 8px;
        left: 0;
        position: absolute;
        top: 0;
        transition: 0.4s ease;
        width: 1px;
      }

      .caret:before {
        transform: rotate(-135deg);
      }
      .caret:after {
        transform: rotate(135deg);
      }

      .inner-container:has([data-expand]) .caret {
        transform: rotate(0);
        transform: translate(0, -6px);
      }

      .inner-container:has([data-expand]) .caret:before {
        transform: rotate(-90deg);
      }

      .inner-container:has([data-expand]) .caret:after {
        transform: rotate(90deg);
      }

      .controls {
        grid-area: controls;
      }

      .location {
        grid-area: location;
      }

      .grid-status {
        grid-area: status;
      }

      .holder {
        position: relative;
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
        border: 0.5px solid #b8bcb5;
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

      div.divider,
      #gaw-info-bar-auto {
        position: relative;
        display: flex;
        align-items: center;
      }

      #gaw-info-bar-auto {
        gap: 0.5rem;
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
        /* gap: 1rem; */
        /* justify-content: center; */
      }

      .split-content > * {
        /* padding-inline: 0.25rem; */
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

      div.divider:has(input[checked]):after {
        display: none;
      }

      .spaced {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
      }

      button {
        background: none;
        border: none;
        font-family: inherit;
        padding: 0.5rem 0.75rem;
      }

      /* Toggle Switch Styles */
      .toggle-switch {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        user-select: none;
        min-height: 28px; /* Ensure minimum touch target size */
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
      }

      .toggle-slider {
        position: relative;
        display: inline-block;
        width: 3.75em;
        height: 2.25em;
        background-color: #ccc;
        border-radius: 1.25em;
        transition: all 0.4s ease;
        box-sizing: border-box;
        border: 1px solid transparent;
      }

      .toggle-slider:before {
        position: absolute;
        content: "";
        height: 1.75em;
        width: 1.75em;
        left: 0.15em;
        bottom: 0.2em;
        background-color: currentColor;
        border-radius: 50%;
        transition: 0.4s;
      }

      /* On state */
      .toggle-switch input:checked + .toggle-slider {
        background-color: #86ca7a;
      }

      /* Hover state */
      .toggle-switch:hover .toggle-slider {
        background-color: #b3b3b3;
      }

      .toggle-switch:hover input:checked + .toggle-slider {
        background-color: #75b369;
      }

      /* Active/pressed state */
      .toggle-switch:active .toggle-slider {
        background-color: #999999;
      }

      .toggle-switch:active input:checked + .toggle-slider {
        background-color: #5d9a53;
      }

      /* Focus states for accessibility */
      .toggle-switch input:focus + .toggle-slider {
        box-shadow: 0 0 2px 2px rgba(77, 144, 254, 0.5);
      }

      .toggle-switch input:checked + .toggle-slider:before {
        transform: translateX(1.55em);
      }

      .toggle-label {
        user-select: none;
      }

      /* For visual accessibility */
      .toggle-switch input:focus-visible + .toggle-slider {
        outline: 2px solid #4d90fe;
        outline-offset: 1px;
      }

      /* High contrast mode support */
      @media (forced-colors: active) {
        .toggle-slider {
          border: 1px solid CanvasText;
        }
        .toggle-slider:before {
          background-color: CanvasText;
        }
        .toggle-switch input:checked + .toggle-slider {
          background-color: Highlight;
        }
      }

      /* Keyboard accessibility improvements */
      .toggle-switch:focus-within {
        outline: 2px solid transparent;
      }

      /* Improve toggle interactive states */
      .toggle-switch input:disabled + .toggle-slider {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .toggle-slider {
        cursor: pointer;
      }

      /* Improve touch target size for mobile accessibility */
      @media (pointer: coarse) {
        .toggle-slider {
          width: 2.8em;
          height: 1.5em;
        }

        .toggle-slider:before {
          height: 1.1em;
          width: 1.1em;
          bottom: 0.2em;
        }

        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(1.3em);
        }
      }

      /* Reduce motion preference support */
      @media (prefers-reduced-motion: reduce) {
        .toggle-slider,
        .toggle-slider:before {
          transition-duration: 0.1s;
        }

        .caret,
        .caret:before,
        .caret:after {
          transition-duration: 0.1s;
        }
      }

      /* Support for Windows High Contrast Mode */
      @media screen and (-ms-high-contrast: active) {
        .toggle-slider {
          background-color: WindowText;
          border: 1px solid WindowText;
        }

        .toggle-slider:before {
          background-color: Window;
        }

        .toggle-switch input:checked + .toggle-slider {
          background-color: Highlight;
        }
      }

      :host
        .inner-container:has(#gaw-info-controls label > input:not([checked]))
        > .holder:not(#gaw-info-controls) {
        display: none;
      }

      button:not(:disabled) {
        background: none;
        border: none;
        font-family: inherit;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
      }

      button#gaw-manual-low {
        --activeButtonBackgroundColor: #86ca7a;
      }

      button#gaw-manual-moderate {
        --activeButtonBackgroundColor: #eca75d;
      }

      button#gaw-manual-high {
        --activeButtonBackgroundColor: #e4a08a;
      }

      button:not(#gaw-manual-low):not(#gaw-manual-moderate):not(
          #gaw-manual-high
        ):not(:disabled)[data-active] {
        border: 1px solid currentColor;
      }

      button:not(:disabled)[data-active] {
        background: var(--activeButtonBackgroundColor);
      }

      .popover-wrapper {
        position: relative;
        cursor: pointer;
      }

      .popover-wrapper button {
      }

      .popover-content {
        width: 100%;
        max-width: 40ch;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .popover-content::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
      }

      @supports (position-try: most-height flip-block) {
        .popover-content {
          width: anchor-size(width);
          position: fixed; /* Essential for CSS Anchor Positioning */
          position-anchor: --infoAnchor;

          left: 0;
          top: 0;
          transform: translate(0, 0);

          /* Default position (first attempt: below the anchor) */
          position-area: bottom center;
          margin-top: 8px;
          top: anchor(bottom);
          left: anchor(left);
          position-try: most-height flip-block;
        }

        .popover-content::backdrop {
          background-color: transparent;
        }
      }

      .popover-message {
        padding-inline: 1em;
        text-align: center;
        line-height: 1.65;
      }

      .controls .divider {
        flex-wrap: wrap;
        justify-content: flex-start;
        row-gap: 0;
      }

      .controls > .holder {
        flex-wrap: wrap-reverse;
        width: 100%;
        anchor-name: --infoAnchor;
      }

      @container wrapper (width < 40em) {
        .inner-container {
          grid-template-areas:
            "status"
            "location"
            "controls";
        }

        .inner-container:has(input[checked]) .location {
          display: none;
        }

        .inner-container:has([data-expand]):has(input[checked]) .location {
          display: flex;
        }

        #gaw-info-bar-manual
          button:first-child:not(:disabled):not([data-active]) {
          padding-inline-start: 0;
        }
      }

      @container wrapper (width < 30.625em) {
        .controls .divider:after {
          display: none;
        }
      }

      @container wrapper (width > 45em) {
        .inner-container {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .location {
          order: 1;
        }
        .grid-status {
          order: 2;
        }
        .controls {
          order: 3;
          flex-grow: 1;
          display: flex;
          justify-content: flex-end;
        }

        .controls .holder {
          width: auto;
        }

        .inner-container:has(input[checked]) .location,
        .inner-container:has(input[checked]) .controls {
          display: flex;
        }

        .holder {
          border: 1px solid #b8bcb5;
        }

        #expander {
          display: none;
        }
      }
    `;
  }
}
