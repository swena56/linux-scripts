var React = require('react');  
var Reflux = require('reflux');  
var ContentReviewerStore = require('./ContentReviewerStore');  
var ContentReviewerActions = require('./ContentReviewerActions');

var ContentReviewer = React.createClass({  
 // Connects this.state in component to this.data in store
 mixins: [ Reflux.connect(ContentReviewerStore, "review") ],

 render: function () {
  // Typically each of these branches would be its own component. I've inlined them here for simplicity's sake.
  if (this.state.review) {
   return (
    <div>
     <h1>{ this.state.review.review_id }</h1>
     <button onClick={ this._markApproved }>Approve</button>
     <button onClick={ this._markRejected }>Reject</button>
     <button onClick={ this._submitReview }>Submit</button>
    </div>
   )
  } else if (this.state.loadError) {
   return (
    <h1 className="alert">{ this.state.loadError }</h1>
   )
  } else {
   return (
    <span>"Loading"</span>
   )
  }
 },

 _markApproved: function() {
  ContentReviewerActions.updateStatus("approved");
 },

 _markRejected: function() {
  ContentReviewerActions.updateStatus("rejected");
 },

 _submitReview: function() {
  ContentReviewerActions.submitReview();
 }
});

module.exports = ContentReviewer;