function Animal(name, speed, focus) {
  this.name = name;
  this.speed = speed;
  this.focus = focus;
  this.position = 0;
  this.picked = false;

  this.run = function() {
    if (Math.random() * 10 < this.focus) {
        this.position = this.position + this.speed;
        if (this.position > raceDist) {
            this.position = raceDist;
        }
        return this.position;
    } else {
        return this.position;
    }
  };
  this.userAnimalPick = function() {
    this.picked = true;
  };
}

var raceDist = 100;
var turtle = new Animal("Tortoise", 10, 8);
var rabbit = new Animal("Hare", 25, 3);
var money = 100;

function gamble(player1, player2) {
  //
  if(player1.position === raceDist || player2.position === raceDist){
    var money = 100;
    //the race has been won
    if(player1.position > player2.position){
      //player 1 has won
      displayWinner("The " + player1.name + " has won!");

      if(player1.picked === true){
        //you picked the winner
        money = money + 100;
      }else{
        //you didn't pick the winner
        money = money - 100;
      }
      renderMoney("You now have $" + money + ".");
    }else if(player2.position > player1.position){
      //player 2 has won
      displayWinner("The " + player2.name + " has won!");

      if(player2.picked === true){
        //you picked the winner
        money = money + 100;
      }else{
        //you didn't pick the winner
        money = money - 100;
      }
      renderMoney("You now have $" + money + ".");
    }else{
      //it's a draw!
      renderMoney("Nobody won!  It's a draw!. You now have $" + money +".");
    }

  }
}

function displayWinner(message){
  $('#winnerOutput').attr('value', message);
}

function renderMoney(message){
  $('#userMoneyOutput').attr('value', message);
}

function startTurn(player1, player2) {
  if (player1.picked === true || player2.picked === true) {
    if(player1.position == raceDist || player2.position == raceDist){
      //don't do anything...somebody has already won
    }
    else{
      player1.run();
      $('#tortoiseOutput').attr('value', player1.position);
      player2.run();
      $('#hareOutput').attr('value', player2.position);
      $('#start').html('RUN!!!');
    }
  }
  else {
      $('#userMoneyOutput').attr('value', 'You must pick an animal to WIN.');
  }
}

$(function(){
  $('#tortoiseCheck').on('click', function() {
    turtle.userAnimalPick();
  });

  $('#hareCheck').on('click', function() {
    rabbit.userAnimalPick()
  });

  $('#start').on('click', function() {
    startTurn(turtle,rabbit);
    gamble(turtle,rabbit);
  });
});
