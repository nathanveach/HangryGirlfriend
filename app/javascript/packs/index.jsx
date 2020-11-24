import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HiddenForm from '../components/HiddenForm';

document.addEventListener('turbolinks:load', () => {
  render(
    <HiddenForm />,
    document.body.appendChild(document.createElement("div"))
  );
});
