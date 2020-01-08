const { filter, orderBy, values } = require('lodash')

const Pizza = require('../models/pizza')
const ImageStore = require('../lib/imageStore')

const PizzaStore = require('./pizzaStore');

// const pizzas = {}

async function create(name, toppings, img, username) {
  const imgUrl = await ImageStore.save(name.replace(/ /g, '-'), img)
  const pizza = new Pizza(name, toppings, imgUrl, username)
  // pizzas[pizza.id] = pizza
  // return pizza

  return PizzaStore.create(prepPizza(pizza))
}

// for mocks that don't need pizza images saved
function batchImport(name, toppings, imgUrl, username) {
  const pizza = new Pizza(name, toppings, imgUrl, username)
  // pizzas[pizza.id] = pizza
  PizzaStore.create(prepPizza(pizza))
}

async function getForUser(username) {
  // const userPizzas = filter(pizzas, pizza =>
  //   pizza.username === username
  // )

  return PizzaStore.findAll({
    where: {
      username: username,
    },
    raw: true , // tels sqls to send raw data instead of model instance.
  }).then(pizzas => debriefPizzas(pizzas)); // 
  // return userPizzas
}

async function getRecent() {
  // const recentPizzas = orderBy(pizzas, ['created'], ['desc'])
  // return values(recentPizzas).splice(0, 5)
  return PizzaStore.findAll({
    order: [['created', 'DESC']],
    limit: 4,
    // where: {
    //   username: username,
    // },
    raw: true , // tels sqls to send raw data instead of model instance.
  }).then(pizzas => debriefPizzas(pizzas)); // 
  // return userPizzas
}

async function get(pizzaId) {
  // if (!pizzas[pizzaId]) throw new Error('Pizza not found')
  // return pizzas[pizzaId]
  return PizzaStore.findOne({
    where: {
      id: pizzaId
    },
    raw: true,
  }).then(pizza => debriefPizza(pizza));
}

function prepPizza(pizza){
  return {
    ...pizza,
    toppings: JSON.stringify(pizza.toppings)
  }
}

function debriefPizza(pizza){
  return {
    ...pizza,
    toppings: JSON.parse(pizza.toppings)
  }
}

function debriefPizzas(pizzas){
  if(!pizzas || pizzas.length < 1) return false; 
  console.log("PIZZAS", pizzas);
  return pizzas.map((item) => debriefPizza(item));
  // return {
  //   ...pizza,
  //   toppings: JSON.parse(pizza.toppings)
  // }
}

module.exports = {
  batchImport,
  create,
  get,
  getForUser,
  getRecent
}