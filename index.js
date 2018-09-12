$(document).ready(loadFromLocalStorage);

// var title = $('#title-input').val();
// var body = $('#body-input').val();
// var numCards = 0;
// var qualityVariable = 'swill';

$('.save-btn').on('click', onFormSubmit);
$('.submission-form').on('input', onFormInput);
$('.bottom-box').on('click', cardListDelegation);
$('.search-input').on('input', search);

function onFormSubmit(event) {
  event.preventDefault();

  var timeStamp = Date.now();
  var card = generateCardHtml(timeStamp, $('.title-input').val(), $('.body-input').val());

  $( '.bottom-box' ).prepend(card);
  updateLocalStorage(timeStamp, card);

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

function updateLocalStorage(timeStamp, cardHtml) {
  localStorage.setItem(timeStamp, cardHtml);
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
  var currentQuality = $(event.target).siblings('.quality').children('.qualityVariable').text();
  var id = $(event.target).parent().attr('id');
  if(currentQuality === 'swill'){
    $(event.target).siblings('.quality').children('.qualityVariable').text('plausible');
    updateLocalStorage(id, $(event.target).parent()[0].outerHTML);
    return;
  }
  if(currentQuality === 'plausible'){
    $(event.target).siblings('.quality').children('.qualityVariable').text('genius');
    updateLocalStorage(id, $(event.target).parent()[0].outerHTML);
    return;
  }
}

function downvote(event){
  var currentQuality = $(event.target).siblings('.quality').children('.qualityVariable').text();
  var id = $(event.target).parent().attr('id');

  if(currentQuality === 'genius'){
    $(event.target).siblings('.quality').children('.qualityVariable').text('plausible');
    updateLocalStorage(id, $(event.target).parent()[0].outerHTML);
    return;
  }
  if(currentQuality === 'plausible'){
    $(event.target).siblings('.quality').children('.qualityVariable').text('swill');
    updateLocalStorage(id, $(event.target).parent()[0].outerHTML);
    return;
  }
}

function search(event){
  var searchTerm = $(event.target).val();
  var currentCards = $('.bottom-box').children();
  for(var i=0; i < currentCards.length; i++) {
    var title = $(currentCards[i]).children('.title-of-card').text();
    var body = $(currentCards[i]).children('.body-of-card').text();
      
    if(title.includes(searchTerm) || body.includes(searchTerm)){
      $(currentCards[i]).removeClass('hide');
    } else {
      $(currentCards[i]).addClass('hide');
    }

  }
}

