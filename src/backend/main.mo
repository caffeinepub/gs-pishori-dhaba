import Array "mo:core/Array";
import Time "mo:core/Time";
import List "mo:core/List";

actor {
  type ContactSubmission = {
    name : Text;
    phoneNumber : Text;
    message : Text;
    timestamp : Int;
  };

  type TableReservation = {
    name : Text;
    phoneNumber : Text;
    date : Text;
    time : Text;
    guests : Nat;
    timestamp : Int;
  };

  let contactSubmissions = List.empty<ContactSubmission>();
  let tableReservations = List.empty<TableReservation>();

  public shared ({ caller }) func submitContactForm(name : Text, phoneNumber : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      phoneNumber;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(submission);
  };

  public shared ({ caller }) func reserveTable(name : Text, phoneNumber : Text, date : Text, time : Text, guests : Nat) : async () {
    let reservation : TableReservation = {
      name;
      phoneNumber;
      date;
      time;
      guests;
      timestamp = Time.now();
    };
    tableReservations.add(reservation);
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.toArray();
  };

  public query ({ caller }) func getAllTableReservations() : async [TableReservation] {
    tableReservations.toArray();
  };
};
