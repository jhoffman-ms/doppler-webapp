import React from 'react';
import HeaderNav from './HeaderNav/HeaderNav';
import HeaderMessages from './HeaderMessages/HeaderMessages';
import HeaderUserMenu from './HeaderUserMenu/HeaderUserMenu';
import headerData from '../../headerData.json';
import { FormattedMessage } from 'react-intl';

const Header = () => {
  return (
    <div>
      {headerData.alert ? <HeaderMessages alert={headerData.alert} /> : null}
      <header className="header-main">
        <div className="header-wrapper">
          <div className="logo">
            <span className="ms-icon icon-doppler-logo" />
          </div>
          <HeaderNav nav={headerData.nav} />
          <nav className="nav-right-main">
            <ul className="nav-right-main--list">
              <li>
                <span className="active" data-count="1">
                  <span className="ms-icon icon-notification" />
                </span>
              </li>
              <li>
                <FormattedMessage id="header.help_url">
                  {(url) => (
                    <a href={url}>
                      <span className="ms-icon icon-header-help" />
                    </a>
                  )}
                </FormattedMessage>
              </li>
              <li>
                <HeaderUserMenu user={headerData.user} />
              </li>
            </ul>
            <span id="open-menu" className="ms-icon icon-menu desktop-hd-hidden" />
            <span id="close-menu" className="ms-icon icon-close desktop-hd-hidden" />
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
