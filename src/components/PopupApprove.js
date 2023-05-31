import PopupWithForm from "./PopupWithForm.js";

export default class PopupApprove extends PopupWithForm {
 constructor(popupSelector, callbackFunction){
  super(popupSelector, callbackFunction);
 };

  setData(data) {
    this.approveData = data;
  };

  _handleSubmit() {
    this._callback(this.approveData);
    this._submitButton.textContent = 'Удаление...';
  }

  close() {
    super.close();
    this.setData('');
  };
}
