<template>
  <div class="v-cart-address-modal">
    <v-row justify="center">
      <v-dialog v-model="showAddressModal" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <button
            class="v-cart-address-modal__open-btn"
            v-bind="attrs"
            v-on="on"
          >
            Pay: {{ totalMoney }}
          </button>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Your Shipping Address</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Name"
                                hint="First & Last Name"
                                required
                                v-model="name"
                                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Street Address"
                    hint="Number and Street Name"
                    required
                    v-model="street"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="City"
                                hint="City & State"
                                required
                                v-model="city"
                                ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Country"
                                hint="Country"
                                required
                                v-model="country"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Zip Code"
                                hint="Zip"
                                required
                                v-model="zip"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small v-if="this.requiredhint" class="v-cart-address-modal__require-hint">all fields are required</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="showAddressModal = false">Close</v-btn>
            <v-btn
              @click="toParent('send-usr-data')"
              text>Pay</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'v-cart-address-modal',
    data() {
      return {
          showAddressModal: false,
          name: '',
          street: '',
          city: '',
          country: '',
          zip: '',
          requiredhint: false,
      }
    },
    props: {
      totalMoney: {
        type: Number,
        default() {
          return {}
        }
      }
    },
    methods: {
      ...mapActions(['GET_RECENT_ADDRESSES']),

      toParent(method) {
        const { name, street, city, country, zip } = this;

        if (name && street && city && country && zip) {
          var usrData = {};
          usrData['name'] = name;
          usrData['street'] = street;
          usrData['city'] = city;
          usrData['country'] = country;
          usrData['zip'] = zip;
          this.showAddressModal = false;
          this.$emit(method, usrData)
        } else {
          this.requiredhint = true;
          return
        }
      },

      getRecentAddresses() {
        this.GET_RECENT_ADDRESSES().then((addresses) => {
          console.log(addresses);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    mounted() {
      this.GET_RECENT_ADDRESSES().then((addresses) => {
        console.log(addresses);
        this.name = addresses['name'];
        this.street = addresses['street'];
        this.city = addresses['city'];
        this.country = addresses['country'];
        this.zip = addresses['zip'];
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
</script>


<style lang="scss">
.v-cart-address-modal {
  &__open-btn {
      position: fixed;
      bottom: 0;
      right:0;
      left: 0;
      width: 100%;
      padding: $padding $padding;
      display: flex;
      justify-content: center;
      background: green;
      color: white;
      font-size: 25px;
  }
 &__require-hint {
   color: red;
 }
}

</style>
