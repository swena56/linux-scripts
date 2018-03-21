import React, { Component, PropTypes } from 'react';
import { Card, CardImg, Button, CardBody, CardTitle, CardLink, CardSubtitle, CardText, Row, Col } from 'reactstrap';

const TestCard = (props) => {
  return (
    <div>
    <Row>
        <Col sm="6">
             <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
              </CardBody>
              <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBody>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <CardLink href="#">Card Link</CardLink>
                <CardLink href="#">Another Link</CardLink>
              </CardBody>
            </Card>
        </Col>
    </Row>
    </div>
  );
};

const BootstrapCard1 = () => {
  return (
    <div className="card">
  <div className="card-header">
    Featured
  </div>
  <div className="card-body">
    <h5 className="card-title">Special title treatment</h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
  );
};

const BootstrapCard2 = () => {
  return (

    <div className="card border-success mb-3" style="max-width: 18rem;">
  <div className="card-header bg-transparent border-success">Header</div>
  <div className="card-body text-success">
    <h5 className="card-title">Success card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <div className="card-footer bg-transparent border-success">Footer</div>
</div>
  );
};


class CardExample extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{paddingBottom: '15px'}}>
            <BootstrapCard1 />
            <TestCard />
            </div>
        );
    }
}

export default CardExample;


//https://lh3.googleusercontent.com/Xc1XaWpldLy4oCQP99x8MGcu7ZYkzHkOUeqVeV9cLC_oAVcvJD7te6HLVeJ_48dVU0o6YXvuljA6J5d8pdoGpNMxYW-F3low9mcoffwqPAMR4-q3qFoJBUatvKtCIFvJ5cFFzSFBp5FokOa3Sqqn5uTrwaWF0l1FNYi58BzRZIRuyozn6TaVu6_tCX6uR1Roan3l59LyTiZqSPBkh6mR5D_wxAmk_zZ_AvTzhlkQdGki9w6H_YTc_1bcnn5hz-2CnFIfPpzZPNSwqnvYTVyLT256L4vY8hGiJRc_nnKjP-Xk8wi68YrJ7bR05vwPNQoafPeysp4qAdOxs7hkAxlrMlB8pnt0vQx5upwwgvHkjyoVOARvP9ULGItV08T7ieQw09dhiQwNWEzIByyx7hWrfKjuzQe2i_LsR5GYjvom64C8daYdKs2xR8wDDnfwjqdJi1DMdx1fCE1VngrTp49iO9mOVODNRjHpgMiMUDOZANaz8vp1qbQPMhckUpZxhmYb9eoafpbtAQr_hA_BGfOMXhrd9fKAwzcbQBbvT5dVeUiOXMjg4DGaVFDXen5mGWTEutBgiL6eAqco9v9aXRShEbfr_VNQpO4eRUnqZhKC8ceMa-Tq6ZVFtTJMzwRjfFMc6avagz8hors12TmV_5O2BRQewub2V4qf=w645-h860-no
//https://lh3.googleusercontent.com/(LONGLONGCODE...)=w800-h600-no
