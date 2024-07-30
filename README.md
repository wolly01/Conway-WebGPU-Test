# Conway-WebGPU-Test
A small WIP refactor of some old webgpu code running a basic game-of-life

---

At the moment this site just generates a random grid of points and runs game-of-lie at fast as the `requestAnimationFrame` and gpu compute resources allow. after refactoring is fihsined the plan is to add a small form to control things like simulation speed and game-of-life rulesets.
 
 ---
 Live (static-site) version avliable as github-page [here](https://wolly01.github.io/Conway-WebGPU-Test/).

## Code-Layout / Design (WIP still being written)
---

It seems when working with WebGPU, one of the most important design considerations is how to work with resources that may become invalid (notebly a device becoming lost). These losses may be transiant and they may not be.
At time of writing, code has not been added to handle such losses gracefully but the eventual plan is for it to do so. Inspired by the webgpu spec itself to partition the individual elements of my widgit into logically distinct objects whos reqources can be `requested()` and `destroyed()`
to set-up the various resources of the widgit.

# Layout of Objects
```
CONWAY_WIDGIT (extends HTMLElement)
┣ GPU_STACK
┣ conway_canvas
┣ ... TODO
```
* CONWAY_WIDGIT\
  The Self-contained HTMLElement that wrappes up the whole game-of-life widgit.
* GPU_STACK\
 A small wrapper object that wrappes up the management and requesting of a `self.naviator.gpu`'s `adapter` and `device`.
* conway_canvas
# Dependencey of Objects
TODO
