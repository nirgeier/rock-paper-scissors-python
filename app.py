# Import the game logic
from flask import Flask, request, render_template

################################################################
# Game logic
################################################################

# Game matrix
# equality = Same cards

# Those are the cards in which the user wins the game
user_wins = {
    ('rocks', 'scissors'): True,
    ('paper', 'rocks'): True,
    ('scissors', 'paper'): True
}


def play(userCard=-1, computerCard=-1):
    '''
    - This is the main function of the game.
    - The function check to see if we have a draw
    - If not, we search the tuple dictionary for winner position
    '''

    # First lets check that the game is not a draw
    if (userCard == computerCard):
        return "-1"

    return str((userCard, computerCard) in user_wins)


################################################################
# Flask server
################################################################
app = Flask(__name__)


@app.route('/api', methods=['GET'])
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/game', methods=['GET'])
def game():
    return play(request.args.get('userCard'), request.args.get('computerCard'))


def create_app(__name__):
    return app
