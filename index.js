$(document).ready(loadFromLocalStorage);

$('.save-btn').on('click', onFormSubmit);
$('.submission-form').on('input', onFormInput);
$('.bottom-box').on('click', cardListClickDelegation);
$('.bottom-box').on('input', cardListInputDelegation);
$('.search-input').on('input', search);

function onFormSubmit(event) {
  event.preventDefault();

  var timeStamp = Date.now();
  var card = new Card(timeStamp, $('.title-input').val(), $('.body-input').val());
  var cardHtml = generateCardHtml(card);

  $( '.bottom-box' ).prepend(cardHtml);
  updateLocalStorage(timeStamp, JSON.stringify(card));

  $('form')[0].reset();
  $('.save-btn').prop('disabled', true);
}

function onFormInput() {
  if($('.title-input').val() === '' || $('.body-input').val() === ''){
    $('.save-btn').prop('disabled', true);
  }
  else{
    $('.save-btn').prop('disabled', false);
  }
}

function generateCardHtml(card) {
  return    `<div id='${card.id}' class='card-container'>
                <h2 class='title-of-card' contentEditable='true'> ${card.title} </h2>
                <button class='delete-button'></button>
                <p class='body-of-card' contentEditable='true'> ${card.body}</p>
                <button class='upvote'></button>
                <button class='downvote'></button>
                <p class='quality'> quality: <span class='qualityVariable'>${card.state}</span></p>
                <button class='complete'>complete</button>
                <hr> 
            </div>`;
};



function generateCardFromHtml(cardHtml) {
  var state = $(cardHtml).children('.quality').children('.qualityVariable').text();
  var id = $(cardHtml).attr('id');
  var title = $(cardHtml).children('.title-of-card').text();
  var body = $(cardHtml).children('.body-of-card').text();

  return new Card(id, title, body, state);
}

function updateLocalStorage(timeStamp, card) {
  localStorage.setItem(timeStamp, card);
}

function loadFromLocalStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var timeStamp = localStorage.key(i);
    var stringifiedCardObject = localStorage.getItem(timeStamp);
    var cardObject = JSON.parse(stringifiedCardObject);
    var cardHtml = generateCardHtml(cardObject);
    $( '.bottom-box' ).prepend(cardHtml);
  }
}

function Card(id, title, body, state, completed) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.state = state || 'swill';
  this.completed = completed || false;
  return;
}

function cardListClickDelegation(event) {
  if (event.target.className === 'delete-button') deleteHandler(event);
  if (event.target.className === 'upvote') upvote(event);
  if (event.target.className === 'downvote') downvote(event);
  if (event.target.className === 'complete') completeTask(event);
}

function cardListInputDelegation(event) {
  if (event.target.className === 'title-of-card' || event.target.className === 'body-of-card'){
    var wholeCard = event.target.parentNode 
    var cardStringForm = wholeCard.outerHTML;
    var cardObject = generateCardFromHtml(cardStringForm)
    localStorage.setItem(cardObject.id, JSON.stringify(cardObject))
  }
}

function deleteHandler(event) {
  var cardElement = $(event.target).closest('.card-container').remove();
  var timeStamp = cardElement[0].id;
  localStorage.removeItem(timeStamp);
}

function upvote(event){
  var card = generateCardFromHtml($(event.target).parent()[0].outerHTML);

  if(card.state === 'swill'){
    $(event.target).siblings('.quality').children('.qualityVariable').text('plausible');
    card.state = 'plausible';

  } else if(card.state === 'plausible'){
    $(event.target).siblings('.quality').children('.qualityVariable').text('genius');
    card.state = 'genius';
  }
  updateLocalStorage(card.id, JSON.stringify(card));
}

function downvote(event){
  var card = generateCardFromHtml($(event.target).parent()[0].outerHTML);

  if(card.state === 'genius'){
    $(event.target).siblings('.quality').children('.qualityVariable').text('plausible');
    card.state = 'plausible';
  }
  if(card.state === 'plausible'){
    $(event.target).siblings('.quality').children('.qualityVariable').text('swill');
    card.state = 'swill';
  }
  updateLocalStorage(card.id, JSON.stringify(card));
}

function search(event){
  var searchTerm = $(event.target).val();
  var currentCards = $('.bottom-box').children();
  
  for (var i=0; i < currentCards.length; i++) {
    var title = $(currentCards[i]).children('.title-of-card').text();
    var body = $(currentCards[i]).children('.body-of-card').text();
      
    if(title.includes(searchTerm) || body.includes(searchTerm)){
      $(currentCards[i]).removeClass('hide');
    } else {
      $(currentCards[i]).addClass('hide'); 
    }
  }
}

function completeTask(event) {
   $(event.target).siblings('.title-of-card').toggleClass('completeTask');
   var timeStamp = event.target.parentNode.id;
   var cardObject = JSON.parse(localStorage.getItem(timeStamp));
   cardObject.completed = !cardObject.completed;
   updateLocalStorage(cardObject.id, JSON.stringify(cardObject));
 }




