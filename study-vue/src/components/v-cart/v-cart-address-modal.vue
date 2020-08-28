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
            <span class="headline">Participant information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Legal first name"
                                required
                                v-model="fName"
                                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal last name"
                    persistent-hint
                    required
                    v-model="lName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Nickname"
                                hint="everybody could see tickets by entering nickname"
                                required
                                v-model="nName"
                                ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email"
                                hint="you will be informed by this email"
                                required
                                v-model="eMail"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Address"
                                required
                                v-model="Address"></v-text-field>
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
  export default {
    name: 'v-cart-address-modal',
    data() {
      return {
          showAddressModal: false,
          fName: '',
          lName: '',
          nName: '',
          eMail: '',
          Address: '',
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
      toParent(method) {
        const { fName, lName, nName, eMail, Address } = this;

        if (fName && lName && nName && eMail && Address) {
          var usrData = {};
          usrData['fName'] = fName;
          usrData['lName'] = lName;
          usrData['nName'] = nName;
          usrData['eMail'] = eMail;
          usrData['Address'] = Address;
          this.showAddressModal = false;
          this.$emit(method, usrData)
        } else {
          this.requiredhint = true;
          return
        }
      }
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
