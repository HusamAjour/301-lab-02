'strict mode';
let keywords = [];
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

Animal.all = [];
function Animal(data) {
  this.name = data.title;
  this.imageURL = data.image_url;
  this.desc = data.description;
  this.keyword = data.keyword;
  Animal.all.push(this);
}
Animal.prototype.render = function () {
  let animalCard = $('#photo-template').first().clone();
  animalCard.find('h2').text(this.name);
  animalCard.find('img').attr('src', this.imageURL);
  animalCard.find('p').text(this.desc);
  $('main').append(animalCard);
};


function fillFilterList(keywords) {
  keywords.forEach(kw => {
    let option = $(`<option></option>`);
    option.attr('value', kw);
    option.text(kw);
    $('select').append(option);
  });
}

$('select').on('change', function () {
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
  } else{
    let animalCard = $('#photo-template').first();
    $('main').html('');
    $('main').append(animalCard);
    Animal.all.forEach(animal => {
      animal.render();
    });
  }
});
