$(document).ready(function() {
  // Clear the console so that we can clearly see what's being logged
  console.clear();

  /**
   * Define the elements we will be working with.
   * ---
   * NOTE: #id selectors are used over .classes because jQuery will use the
   *       .getElementByID() method to traverse the DOM, which is much faster.
   */
  var $toggleButton     = $("#js-pm-toggle-button");
  var $pushSelectors    = $("#js-pm-push-menu, #js-pm-push-pixel");

  // Set up an empty global variable to store the menu's state later
  var menuIsOpen;

  // -----------------------------------------------------------------------------

  /**
   * Default state for the menu.
   * ---
   * NOTE: Use "true" to set the menu to be open by default, and "false" to set
   *       it to be closed by default.
   */
  var openMenuOnLoad = false;

  // -----------------------------------------------------------------------------

  // Set up a function to be used by the click event on $toggleButton
  function toggleMenu() {

    /**
     * Alternate menuIsOpen between true/false on each click.
     * ---
     * NOTE: This needs to happen before checking if the menu is open so that
     *       the localStorage items will be added in the right sequence.
     */  
    menuIsOpen = !menuIsOpen;

    // Check if the push menu has the "open-on-load" class
    if ($pushSelectors.hasClass("open-on-load")) {

      // If it does, remove the class so that we can add the "open" class later
      $pushSelectors.removeClass("open-on-load");

      // Let's send a message to the console to let us know what happened
      console.log("The 'open-on-load' class has been removed.");

    }

    // Check if the push menu should be open
    if (menuIsOpen) {

      /**
       * If the push menu should be open, we'll add a class to animate it into
       * the "open" position.
       */
      $pushSelectors.addClass("open");

      /**
       * We will also add the "opened" state to a localStorage item. This is the
       * property that tells the browser that the menu should be open.
       * ---
       * NOTE: localStorage will only store strings, we can use "opened" and
       *       "closed" as values to determine which state should be set.
       */
      localStorage.setItem("pushSelectors", "opened");
      //                          ^             ^
      //                         key          value

      // And send a message to the console to let us know...
      console.log("The 'opened' storage item has been set.");

    } else {

      /**
       * If the push menu should not be open, we'll remove the "open" class which
       * will animate it back into the "closed" position.
       */
      $pushSelectors.removeClass("open");

      // Now set the storage item to "closed"...
      localStorage.setItem("pushSelectors", "closed");

      // And send a message to the console to let us know...
      console.log("The 'closed' storage item has been set.");

    }

  }

  // Next we'll need to check if the storage item exists at all
  if (localStorage.getItem("pushSelectors") === null) {

    /**
     * If it doesn't, this means that our dear user has not yet visited the page,
     * so we should set the menu state to what ever the default state is
     * ---
     * NOTE: This will also be the case if the user's browser is set to reject
     *       cookies, which includes localStorage. Incognito mode does not store
     *       cookies at all.
     */
    menuIsOpen = openMenuOnLoad;

    // And send a message to the console to let us know...
    console.log("The default menu state is " + openMenuOnLoad);

  } else {

    // If the storage item does exist, and the value is set to "opened"...
    if (localStorage.getItem("pushSelectors") === "opened") {

      // Set the menu state to open
      menuIsOpen = true;

      // And send a message to the console to let us know...
      console.log("The 'opened' storage item is set; the menu should be open.");

    } else {

      // Otherwise, the value should be "closed", set the menu state accordingly
      menuIsOpen = false;

      // And send a message to the console to let us know...
      console.log("The 'closed' storage item is set; the menu should be closed.");

    }

  }

  // Does the "opened" storage item exist, or is the default menu state true?
  if (menuIsOpen) {

    /**
     * If so, the menu should be open when the page loads, so add the
     * "open-on-load" class to animate it into position.
     */
    $pushSelectors.addClass("open-on-load");

    // Let's have the console tell us what's happening...
    console.log("The 'open-on-load' class has been added.");

  }

  /**
   * Finally, fire the toggleMenu function on each click.
   * ---
   * NOTE: This is called last so that the script will first check against all
   *       other conditions, before doing any actual menu toggling.
   */
  $toggleButton.on("click", toggleMenu);
});
