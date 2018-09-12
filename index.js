$(document).ready(loadFromLocalStorage);

// var title = $('#title-input').val();
// var body = $('#body-input').val();
// var numCards = 0;
// var qualityVariable = 'swill';

$('.save-btn').on('click', onFormSubmit);
$('.submission-form').on('input', onFormInput);
$('.bottom-box').on('click', cardListDelegation);

function onFormSubmit(event) {
  event.preventDefault();

  var timeStamp = Date.now();
  var card = generateCardHtml(timeStamp, $('.title-input').val(), $('.body-input').val());

  $( '.bottom-box' ).prepend(card);
  localStoreCard(timeStamp, card);

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

function generateCardHtml(id, title, body) {
  return    `<div id='${id}' class='card-container'>
                <h2 class='title-of-card'> ${title} </h2>
                <button class='delete-button'></button>
                <p class='body-of-card'> ${body}</p>
                <button class='upvote'></button>
                <button class='downvote'></button>
                <p class='quality'> quality: <span class='qualityVariable'>swill</span></p>
                <hr> 
            </div>`;
};

function localStoreCard(timeStamp, cardHtml) {
  var cardString = cardHtml;
  localStorage.setItem(timeStamp, cardString);
}

function loadFromLocalStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var timeStamp = localStorage.key(i);
    var cardData = localStorage.getItem(timeStamp);
    $( '.bottom-box' ).prepend(cardData);
  }
}

// function cardObject() {
//   return {
//     title: $('#title-input').val(),
//     body: $('#body-input').val(),
//     quality: qualityVariable
//   };
// }

function cardListDelegation(event){

  if (event.target.className === 'delete-button') {
    deleteHandler(event);
  }

  if (event.target.className === 'upvote') {
    upvote(event);
  }

  if(event.target.className === 'downvote') {
    downvote(event);
  }
}

function deleteHandler(event) {
  var cardElement = $(event.target).closest('.card-container').remove();
  var timeStamp = cardElement[0].id;
  localStorage.removeItem(timeStamp);
}

function upvote(event){
  var currentQuality = $(event.target).closest('.qualityVariable').text();
  if(currentQuality === 'swill'){
    $(event.target).closest('.qualityVariable').text('plausible');
    return;
  }
  if(currentQuality === 'plausible'){
    $(event.target).closest('.qualityVariable').text('genius');
    return;
  }
}

function downvote(event){
  var currentQuality = $(event.target).closest('.qualityVariable').text();
  if(currentQuality === 'genius'){
    $(event.target).closest('.qualityVariable').text('plausible');
    return;
  }
  if(currentQuality === 'plausible'){
    $(event.target).closest('.qualityVariable').text('swill');
    return;
  }
}

