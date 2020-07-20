'use-strict';

const image = [];

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
        });
        image.forEach(function (element) {
            renderImage(element.image_url, element.title, element.description, element.horns, element.keyword);
        });
    });
}

function renderImage(url, title, description, horns, keyword) {
    let $section = $('<section>').attr('data-keyword', keyword);
    let $title = $('<h2>').text(title);
    let $img = $('<img>').attr('src', url).attr('alt', description);
    let $text = $('<p>').text(`# of horns: ${horns}`);
    $section.append($title, $img, $text);
    $('main').append($section);
}


getData('data/page-1.json');