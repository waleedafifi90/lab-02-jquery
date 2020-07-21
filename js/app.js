'use-strict';

var image = [];
let keywords = [];

function Image(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  keywords.push(keyword);
}

function Keyword(name) {
  this.name = name;
  keywords.push(name);
}

function createList(keyword) {
  let $option = $('<option>').text(keyword).attr('value', keyword);
  $('#Filter').append($option);
}

Image.prototype.renderImage = function () {
  let template = $('#imageTemplate').html();
  let rederedObject = Mustache.render(template,this);
  $('main').append(rederedObject);
};

function hideImageElement() {
  let value = $(this).val();

  console.log(value);
  if(value !== 'default'){
    $('section').hide();
    $(`section[data-keyword=${value}]`).fadeIn(500);
  } else {
    $('section').fadeIn(500);
  }
}

let numPage = 1;
numPage = $('button').on('click', function() {
  numPage = $(this).attr('id'); //to get the id clicked button
  console.log(numPage);
  getData(`data/page-${numPage}.json`);
});

getData(`data/page-1.json`);

function getData(url) {
  $('main').empty();
  image = [];
  $('#Filter').find('option').not(':first').remove();
  
  $.get(url, function (data) {
    let $data = data;
    let array = [];
    $data.forEach(function (element) {
      image.push(new Image(element.image_url, element.title, element.description, element.keyword, element.horns));
      array.push(element.keyword);
      // keywords = new Keyword(element.keyword);
    });
    image.forEach(function (element) {
      element.renderImage(element.image_url, element.title, element.description, element.horns, element.keyword);
    });
    array = new Set(array);

    array.forEach(function (element) {
      createList(element);
    });
    $('#Filter').change(hideImageElement);
    $('#photo-template').remove();
  });
}
