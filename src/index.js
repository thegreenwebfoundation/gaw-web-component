import { GawInfoBar } from './gaw-info-bar.js';

// Export the component class for users who want to extend or customize it
export { GawInfoBar };

// Auto-register the component when this module is imported
customElements.define('gaw-info-bar', GawInfoBar);

// Default export for easier importing
export default GawInfoBar;
