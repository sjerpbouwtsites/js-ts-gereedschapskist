/**
 * when you want to batch promises.... couple with promise.all and this time promise.
 * @param timeTillResolve number the timeout time untill promise resolve.
 */
function time(timeTillResolve: number): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, timeTillResolve)
  })
}

export { time }
