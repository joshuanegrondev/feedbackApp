const item = document.querySelectorAll(".orderListItem");
let trash = document.getElementsByClassName("fa-trash");
const name = document.querySelector(".email").innerText

Array.from(item).forEach(function(element) {
      element.addEventListener('click', function(){
        const customer = this.childNodes[1].innerText
        const review = this.childNodes[3].innerText
        var msg = new SpeechSynthesisUtterance(customer+review);
        window.speechSynthesis.speak(msg);

        fetch('comment', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'customer': customer,
            'review': review,
            'name': name
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const customer = this.parentNode.parentNode.childNodes[3].innerText
        const review = this.parentNode.parentNode.childNodes[5].innerText

        fetch('comment', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'customer': customer,
            'review': review,
            'name': name
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
