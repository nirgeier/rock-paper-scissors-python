/**
 * Open socket connection
 */
var Game = (function () {

  let
    // Create the socket connection
    //socket = io(),

    // List of play images
    cards = [
      'rocks',
      'paper',
      'scissors'];

  /** Simulate sleep function */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /** Register Js handlers */
  function registerHandlers() {

    // Attach on click event
    $('.move')
      .on('click', function (e) {
        // Add the data-class for ui
        $('.move').attr('data-play', false)

        // Remove the winner class
        $('.winner').removeClass(`winner`);

        // Mark the user selection
        $(e.currentTarget).attr('data-play', true);

        // Update the chosen card
        $('[data-user-play]').css('background-image', 'url(/static/images/' + $(e.currentTarget).attr('data-card') + '.png)');
        $('[data-user-play]').attr('data-user-play', $(e.currentTarget).attr('data-card'))
        play();
      })
  }

  async function play() {
    let
      // Generate random number
      random = Math.floor(Math.random() * 25),
      // Store the temp card
      card;

    // Display random cards (like in slot machine)
    for (let i = 0; i < random; i++) {
      await sleep(100);
      card = cards[Math.floor(Math.random() * 3)];
      $('[data-computer-play]').css('background-image', `url(/static/images/${card}.png)`);
      $('[data-computer-play]').attr('data-computer-play', card)
    }

    // Mark the user selection
    $(`[data-play]`).removeAttr('data-play');

    // Call the python code for the game logic
    $.ajax({
      url: '/game?userCard=' + $('[data-user-play]').attr('data-user-play') +
        '&computerCard=' + $('[data-computer-play]').attr('data-computer-play'),
      success: showResults
    })

  }

  /**
   * Process the game results
   */
  function showResults(result) {
    let winner = -1;

    if (result == "-1")
      return;

    // Set the winner
    winner = (result == "True") ? "user" : "computer";

    // Update the score
    score = parseInt($(`[data-score-${winner}]`).attr(`data-score-${winner}`)) + 1;
    $(`[data-score-${winner}]`)
      .attr(`data-score-${winner}`, score)
      .addClass(`winner`)
      .text(score);

  }


  registerHandlers();

})();
