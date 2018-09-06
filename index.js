// var title = $('#title-input').val();
// var body = $('#body-input').val();
// var numCards = 0;
// var qualityVariable = 'swill';

function generateCardHtml(id , title , body) {
  return    `<div id='${id}' class='card-container'>
                <h2 class='title-of-card'> ${title} </h2>
                <button class='delete-button'></button>
                <p class='body-of-card'> ${body}</p>
                <button class='upvote'></button>
                <button class='downvote'></button>
                <p class='quality'> quality: <span class='qualityVariable'> swill </span></p>
                <hr> 
            </div>`;
};

// function cardObject() {
//   return {
//     title: $('#title-input').val(),
//     body: $('#body-input').val(),
//     quality: qualityVariable
//   };
// }

// $.each(localStorage, function(key) {
//   var cardData = JSON.parse(localStorage.getItem(localStorage.key(key)));
//   numCards++;
//   $( '.bottom-box' ).prepend(generateCardHtml(key, cardData.title, cardData.body, cardData.quality));
// });

var localStoreCard = function(timeStamp, card) {
  var cardString = JSON.stringify(card);
  localStorage.setItem(timeStamp, cardString);
}

$('.save-btn').on('click', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  var timeStamp = Date.now();
  var card = generateCardHtml(timeStamp, $('#title-input').val(), $('#body-input').val());

  $( '.bottom-box' ).prepend(card);
  localStoreCard(timeStamp, card);

  $('form')[0].reset();
}

// $('.bottom-box').on('click', function(event){
//   var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//   var qualityVariable;

//   if (event.target.className === 'upvote' || event.target.className === 'downvote'){

//     if (event.target.className === 'upvote' && currentQuality === 'plausible'){
//       qualityVariable = 'genius';
//       $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
         
//     } else if (event.target.className === 'upvote' && currentQuality === 'swill') {
//       qualityVariable = 'plausible';
//       $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
         
//     } else if (event.target.className === 'downvote' && currentQuality === 'plausible') {
//       qualityVariable = 'swill'
//       $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//     } else if (event.target.className === 'downvote' && currentQuality === 'genius') {
//       qualityVariable = 'plausible'
//       $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//     } else if (event.target.className === 'downvote' && currentQuality === 'swill') {
//       qualityVariable = 'swill';
    
//     } else if (event.target.className === 'upvote' && currentQuality === 'genius') {
//       qualityVariable = 'genius';
//     }

//   var cardHTML = $(event.target).closest('.card-container');
//   var cardHTMLId = cardHTML[0].id;
//   var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//   var cardObjectInJS = JSON.parse(cardObjectInJSON);

//   cardObjectInJS.quality = qualityVariable;

//   var generateCardHtmlJSON = JSON.stringify(cardObjectInJS);
//   localStorage.setItem(cardHTMLId, generateCardHtmlJSON);
//   }
   
//   else if (event.target.className === 'delete-button') {
//     var cardHTML = $(event.target).closest('.card-container').remove();
//     var cardHTMLId = cardHTML[0].id;
//     localStorage.removeItem(cardHTMLId);
//   }
// });
    










