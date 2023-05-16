import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
 constructor(popupSelector, callbackFunction){
  super(popupSelector);
  this.form = this._container.querySelector('.form');
  this._inputList = this.form.querySelectorAll('input');
  this._callback = callbackFunction;
  this._handleSubmit = this._handleSubmit.bind(this);
  this._getInputValues = this._getInputValues.bind(this);
 };

 _getInputValues() {
  const data = {};
  this._inputList.forEach((item) => {data[item.name] = item.value});
  return data;
  };

 _handleSubmit() {
  this._callback(this._getInputValues());
  this.close()
 }

 setEventListeners() {
  super.setEventListeners()
  this.form.addEventListener('submit', this._handleSubmit);
 };

 close() {
  super.close();
  this.form.reset();
 };
}
