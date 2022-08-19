const request = require('supertest')

const { screen } = require('@testing-library/dom')

require('@testing-library/jest-dom')

const server = require('./server')

describe('GET /', () => {
  test.todo('homepage is working') //Ramesh and Elizabeth
})

describe('GET /:id', () => {
  test('check profiles are working', () => {
    return request(server)
      .get('/chicks/3')
      .then((res) => {
        document.body.innerHTML = res.text
        const chick = screen.getByRole('img')
        expect(chick.src).toContain('chick3.png')
      })
  })
})

describe('GET /:id/edit', () => {
  test('check that edit page is showing', () => {
    return request(server)
      .get('/chicks/:id/edit')
      .then((res) => {
        document.body.innerHTML = res.text
        const button = screen.getByRole('button')
        expect(button.value).toMatch(/submit/i)
      })
  })
})

describe('GET /name=??', () => {
  test.todo('check named compliments is working')
})
