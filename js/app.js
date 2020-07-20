'use-strict';

const image = [];
let keywords = [];

function Image(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

function Keyword(name) {
  this.name = name;
  keywords.push(name);
}

function getData(url) {
  $.get(url, function (data) {
    let $data = data;
    $data.forEach(function (element) {
      image.push(new Image(element.image_url, element.title, element.description, element.keyword, element.horns));
      new Keyword(element.keyword);
    });
    image.forEach(function (element) {
      element.renderImage(element.image_url, element.title, element.description, element.horns, element.keyword);
    });
    keywords = new Set(keywords);
    keywords.forEach(function (element) {
      createList(element);
    });
    $('#Filter').change(hideImageElement);
    $('#photo-template').remove();
  });
}

function createList(keyword) {
  let $option = $('<option>').text(keyword).attr('value', keyword);
  $('#Filter').append($option);
}

Image.prototype.renderImage = function (url, title, description, horns, keyword) {
  let template = $('#photo-template').clone();
  template.attr('data-keyword', keyword);
  template.find('h2').text(title);
  template.find('img').attr('src', url).attr('alt', description);
  template.find('p').text(`# of horns: ${horns}`);
  $('main').append(template);
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

getData('data/page-1.json');
