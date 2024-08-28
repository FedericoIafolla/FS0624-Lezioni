import React from 'react';
import './Account.css';
import { Dropdown } from 'react-bootstrap';
import avatar from '../assets/Fox.png';

function Account() {
  return (
    <div className="account-page">
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#212121' }}>
        <a className="navbar-brand" href="/index.html">

        </a>
      </nav>

      <div className="container">
        <div className="profile-edit">
          <div className="profile-header">Edit Profile</div>
          <div className="divider"></div>
          <div className="row">
            <div className="col-md-3">
              <img src={avatar} className="img-fluid" alt="Profile Image" />
            </div>
            <div className="col-md-9">
              <div className="user-info">
                <div className="user-name-box">Federico Iafolla</div>
                <div>Language:</div>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdownMenuButton">
                    Select Language
                  </Dropdown.Toggle>

                  <Dropdown.Menu aria-labelledby="dropdownMenuButton">
                    <Dropdown.Item href="#">English</Dropdown.Item>
                    <Dropdown.Item href="#">Italiano</Dropdown.Item>
                    <Dropdown.Item href="#">Español</Dropdown.Item>
                    <Dropdown.Item href="#">Français</Dropdown.Item>
                    <Dropdown.Item href="#">Deutsch</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="divider"></div>
              <div className="maturity-settings">
                <div>Maturity Settings:</div>
                <button className="btn-no-radius mt-2 mb-2">ALL MATURITY RATINGS</button>
                <div className="info-text">
                  Show titles of all maturity ratings for this profile.
                </div>
                <button className="btn-no-radius mt-3">EDIT</button>
              </div>
              <div className="divider"></div>
              <div className="autoplay-controls">
                <div>Autoplay controls</div>
                <div className="autoplay-item">
                  <div className="btn-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-toggle-on" viewBox="0 0 16 16">
                      <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
                    </svg>
                  </div>
                  <p>Autoplay next episode in a series on all devices.</p>
                </div>
                <div className="autoplay-item">
                  <div className="btn-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-toggle-on" viewBox="0 0 16 16">
                      <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
                    </svg>
                  </div>
                  <p>Autoplay previews while browsing on all</p>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="action-buttons">
              <button className="btn btn-save">SAVE</button>
              <button className="btn btn-cancel">CANCEL</button>
              <button className="btn btn-delete">DELETE PROFILE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
