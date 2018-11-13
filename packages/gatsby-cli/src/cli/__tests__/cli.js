const execa = require(`execa`)

afterAll(done => {
  ;(async function() {
    try {
      await execa(`rm`, [`-r`, `gatsby-app`])
      await execa(`rm`, [`-r`, `gatsby-app1`])
      done()
    } catch (e) {
      done()
    }
  })()
}, 800000)

describe(`Gatsby CLI`, () => {
  it(
    `takes shorter to create a new project using --use-pnp flag`,
    async done => {
      const withPnp = await execa(`packages/gatsby-cli/lib/index.js`, [
        `new`,
        `gatsby-app`,
        `--use-pnp`,
      ])
        .then(function(result) {
          return result.stdout.split(`Setup time:`)[1].split(`ms`)[0]
        })
        .catch(function(error) {
          console.log(error)
        })

      const withoutPnp = await execa(`packages/gatsby-cli/lib/index.js`, [
        `new`,
        `gatsby-app1`,
      ])
        .then(function(result) {
          return result.stdout.split(`Setup time:`)[1].split(`ms`)[0]
        })
        .catch(function(error) {
          console.log(error)
        })
      expect(Number(withPnp)).toBeLessThan(Number(withoutPnp))
      done()
    },
    800000
  )
})
