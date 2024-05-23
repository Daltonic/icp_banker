import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor Banker {
  stable var currentBankBalance : Float = 300;
  // currentBankBalance := 300;
  stable var startTIme = Time.now();

  Debug.print(debug_show ("Initial Value: ", currentBankBalance));
  Debug.print(debug_show ("Current Time: ", startTIme));

  public func fundAccount(amount : Float) {
    currentBankBalance += amount;
    Debug.print(debug_show ("Current Value: ", currentBankBalance));
  };

  public func withdrawFund(amount : Float) {
    if (currentBankBalance >= amount) {
      currentBankBalance -= amount;
      Debug.print(debug_show ("Current Value: ", currentBankBalance));
    } else {
      Debug.print(debug_show ("Insufficient balance"));
    };
  };

  public query func getBalance() : async Float {
    return currentBankBalance;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTIme;
    let timeElapsedSec = timeElapsedNS / 1000000000;
    currentBankBalance := currentBankBalance * (1.01 ** Float.fromInt(timeElapsedSec));
    startTIme := currentTime;
  };
};
