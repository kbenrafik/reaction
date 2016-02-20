/**
 * onCreated: Account Profile View
 */
Template.accountProfile.onCreated(() => {
  let template = Template.instance();

  template.userHasPassword = ReactiveVar(false);

  Meteor.call("accounts/currentUserHasPassword", (error, result) => {
    template.userHasPassword.set(result);
  });
});

/**
 * Helpers: Account Profile View
 */
Template.accountProfile.helpers({

  /**
   * User has password
   * @return {Boolean} return true if the current user has a password, false otherwise
   */
  userHasPassword() {
    return Template.instance().userHasPassword.get();
  },

      /**
       * User's products
       * @return {Array|null} an array of available products for the user
       */
      userProducts() {
        if (Meteor.user()) {
          ReactionCore.Log.debug("userProducts: sreaching products for use ", Meteor.userId());
          return ReactionCore.Collections.Products.find({
            userId: Meteor.userId()
          }, {
            sort: {
              createdAt: -1
            },
            limit: 25
          });
        }
      },

  /**
   * User's order history
   * @return {Array|null} an array of available orders for the user
   */
  userOrders() {
    const orderSub = Meteor.subscribe("AccountOrders", Meteor.userId());
    if (orderSub.ready()) {
      return ReactionCore.Collections.Orders.find({
        userId: Meteor.userId()
      }, {
        sort: {
          createdAt: -1
        },
        limit: 25
      });
    }
  },


  /**
   * User's account profile
   * @return {Object} account profile
   */
  account() {
    return ReactionCore.Collections.Accounts.findOne();
  },

  /**
   * Returns the address book default view
   * @return {String} "addressBookGrid" || "addressBookAdd"
   */
  addressBookView: function () {
    let account = ReactionCore.Collections.Accounts.findOne();
    if (account.profile) {
      return "addressBookGrid";
    }
    return "addressBookAdd";
  }
});
