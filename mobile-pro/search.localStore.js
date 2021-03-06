
/* eslint-disable */
(function() {
  function Storage (option) {
    this.storage = option.storage
    this.limit = option.limit
    this.input = option.input
  }
  
  Storage.prototype.checkStorage = function () {
    var storage = window.localStorage.getItem(this.storage)
    if (!storage) {
      return
    }
    this.history = JSON.parse(storage)
    return this.history
  }
  
  Storage.prototype.setStorage = function (val) {
    // 如果有传入值
    if(val) {
      this.value = val
      console.log('val-23')
    } else {
      this.value = this.input.value.replace(/(^\s*)|(\s*$)/g, '')
      this.value = this.value.replace(/</, '&lt;')
      this.value = this.value.replace(/>/, '&gt;')
    }
    this.checkStorage()
    var history
    if (this.history) {
      history = this.history
    } else {
      history = []
    }
  
    var indexof = history.indexOf(this.value)
    if (indexof !== -1) {
      history.splice(indexof, 1)
    }
    history.unshift(this.value)
    if (this.limit && history.length > this.limit) {
      history.splice(history.length - 1, 1)
    }
    history = JSON.stringify(history)
    window.localStorage.setItem(this.storage, history)
  }
  
  Storage.prototype.cancelStorage = function (val) {
    this.checkStorage()
    if (!this.history) return
    if (!val) {
      window.localStorage.removeItem(this.storage)
      this.history = undefined
    } else {
      var indexof = this.history.indexOf(val + '')
      if (indexof === -1) {
        return
      }
      this.history.splice(indexof, 1)
      var history = JSON.stringify(this.history)
      window.localStorage.setItem(this.storage, history)
    }
  }
  if (typeof exports == "object") {
    module.exports = Storage;
  } else if (typeof define == "function" && define.amd) {
    define([], function () {
      return Storage;
    })
  } else {
    window.Storage = Storage;
  }
  })();
  