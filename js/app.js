'strict mode';

$('#page1').on('click', loadPage1);
$('#page2').on('click', loadPage2);
let keywords = [];

function loadPage1() {
  prepareLoad();
  $.ajax('./data/page-1.json').then(data => {
    data.forEach(element => {
      if (!keywords.includes(element.keyword)) {
        keywords.push(element.keyword);
      }
      let newAnimal = new Animal(element);
      newAnimal.render();
    });
    fillFilterList(keywords);
  });
}

function loadPage2() {
  prepareLoad();
  $.ajax('./data/page-2.json').then(data => {
    data.forEach(element => {
      if (!keywords.includes(element.keyword)) {
        keywords.push(element.keyword);
      }
      let newAnimal = new Animal(element);
      newAnimal.render();
    });
    fillFilterList(keywords);
  });
}

function prepareLoad(){
  $('main').html('');
  let defaultFilter = $('#filterMenu option').first();
  $('#filterMenu').html('');
  $('#sortMenu').val('default');
  $('#filterMenu').append(defaultFilter);
  Animal.all =[];
  keywords = [];
}

Animal.all = [];
function Animal(data) {
  this.name = data.title;
  this.imageURL = data.image_url;
  this.desc = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;
  Animal.all.push(this);
}
Animal.prototype.render = function () {
  /*  let animalCard = $('#photo-template').first().clone();
    animalCard.find('h2').text(this.name);
    animalCard.find('img').attr('src', this.imageURL);
    animalCard.find('p').text(this.desc);
    $('main').append(animalCard);
  */
  let temp = $('#aimalCardTemplate').html();
  let cardHtml = Mustache.render(temp, this); //(string,object)
  $('main').append(cardHtml);
};


function fillFilterList(keywords) {
  keywords.forEach(kw => {
    let option = $(`<option></option>`);
    option.attr('value', kw);
    option.text(kw);
    $('#filterMenu').append(option);
  });
}

$('#filterMenu').on('change', function () {
  let filterValue = $(this).val();
  if (filterValue !== 'default') {
    let animalCard = $('#photo-template').first();
    $('main').html('');
    $('main').append(animalCard);
    Animal.all.forEach(animal => {
      if (animal.keyword === filterValue) {
        animal.render();
      }
    });
  } else {
    let animalCard = $('#photo-template').first();
    $('main').html('');
    $('main').append(animalCard);
    Animal.all.forEach(animal => {
      animal.render();
    });
  }
});


$('#sortMenu').on('change', function () {
  let sortValue = $(this).val();
  if (sortValue !== 'default') {
    $('main').html('');
    if(sortValue === 'title'){
      Animal.all.sort( (a,b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if(sortValue === 'horns'){
      Animal.all.sort( (a,b) => {
        if (a.horns > b.horns) {
          return 1;
        } else if (a.horns < b.horns) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    Animal.all.forEach(animal => {
      animal.render();
    });
  }
});
