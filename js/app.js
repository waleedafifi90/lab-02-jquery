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

function getData(url) {
    $.get(url, function (data) {
        let $data = data;
        $data.forEach(function (element) {
            image.push(new Image(element.image_url, element.title, element.description, element.keyword, element.horns));
            keywords.push(element.keyword);
        });
        image.forEach(function (element) {
            renderImage(element.image_url, element.title, element.description, element.horns, element.keyword);
        });
        keywords = new Set(keywords);
        keywords.forEach(function (element) {
            createList(element);
        });
        $('#Filter').change(hideImageElement);
    });
}

function createList(keyword) {
    let $option = $('<option>').text(keyword).attr('value', keyword);
    $('#Filter').append($option);
  }  

  function renderImage(url, title, description, horns, keyword) {
    let $section = $('<section>').attr('data-keyword', keyword);
    let $title = $('<h2>').text(title);
    let $img = $('<img>').attr('src', url).attr('alt', description);
    let $text = $('<p>').text(`# of horns: ${horns}`);
    $section.append($title, $img, $text);
    $('main').append($section);
  }

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
