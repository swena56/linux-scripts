import React, {Component} from 'react';

class CreateItem extends Component {

     constructor(props){
        super(props);
        this.state = {
                data: {
                        name: null,
                        price: 0
                }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     handleSubmit(event){
        console.log("handle submit");
        //alert('a');
        event.preventDefault();
        var data = {
                data: '1',
                value1: '2'
        };
        $.ajax({
                 headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  },
                type: 'POST',
                url: 'endpoint',
                data: data
        }).done(function(result){
                console.log(result);
        });
      }

    render() {
      return (
      <div>
        <h1>Create An Item</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Item Name:</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Item Price:</label>
                  <input type="text" className="form-control col-md-6" />
                </div>
              </div>
            </div><br />
            <div className="form-group">
              <button className="btn btn-primary">Add Item</button>
            </div>
        </form>
  </div>
      )
    }
}
export default CreateItem;