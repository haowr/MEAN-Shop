
var elements = stripe.elements();
var card = elements.create('card');

// Add an instance of the card UI component into the `card-element` <div>
card.mount('#card-element');