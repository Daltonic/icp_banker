import Debug "mo:base/Debug";

actor Banker {
  var currentBankBalance = 300;
  currentBankBalance := 100;

  Debug.print(debug_show("Current Value: ", currentBankBalance));
}

