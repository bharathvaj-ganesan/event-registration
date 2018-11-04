<template>
	<v-dialog
      width="500"
      v-model="editDialog"
			persistent>
      <v-btn
        slot="activator"
        dark
				fab
				fixed
				bottom
				right
				large
				color="accent"
      >
        <v-icon>edit</v-icon>
      </v-btn>

     <v-card>
        <v-card-title>
          <span class="headline">Edit Event</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="organizeEventForm" ref="organizeEventForm" lazy-validation>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                    label="Event Name"
                    :rules="organizeEventFormRules.nameRules"
                    v-model="eventName"
                    validate-on-blur
                    box
                    required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 >
                    <v-textarea
                    label="Description"
                    :rules="organizeEventFormRules.descriptionRules"
                    v-model="description"
                    validate-on-blur
                    box
                    required
                    auto-grow
                    multi-line
                    rows=8
                    counter=300
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs12 >
                    <v-text-field
                    label="Location"
                    :rules="organizeEventFormRules.locationRules"
                    v-model="location"
                    validate-on-blur
                    box
                    required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 >
                    <v-text-field
                    label="Max Participants"
                    :rules="organizeEventFormRules.maxParticipantsRules"
                    v-model="maxParticipants"
                    validate-on-blur
                    box
                    required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
						</v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="editDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="onSaveEventChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'Organize',
  props: ['event'],
  data() {
    return {
      editDialog: false,
      organizeEventForm: false,
      id: this.event.id,
      eventName: this.event.name,
      location: this.event.location,
      description: this.event.description,
      maxParticipants: this.event.maxParticipants,
      organizeEventFormRules: {
        nameRules: [
          v => {
            return !!v || 'Name is required';
          },
          v => (v && v.length < 40) || 'Name must be less than 40 characters',
          v =>
            /^[a-zA-Z ]+$/.test(v) ||
            'Name can contain only alphabets and white space'
        ],
        descriptionRules: [
          v => {
            return !!v || 'Description is required';
          },
          v =>
            (v && v.length < 300) ||
            'Description must be less than 300 characters',
          v =>
            /^[a-zA-Z ]+$/.test(v) ||
            'Description can contain only alphabets and white space'
        ],
        locationRules: [
          v => {
            return !!v || 'Location is required';
          },
          v => (v && v.length < 40) || 'Name must be less than 40 characters'
        ],
        maxParticipantsRules: [
          v => {
            return !!v || 'Max participants is required';
          },
          v => (v && v < 200) || 'Max participants must be less than 200',
          v =>
            (v && parseInt(v) > 0) ||
            'Max participants cannot be in negative values'
        ]
      }
    };
  },
  methods: {
    /**
     * Organizer event update handler;
     * Validates if the user is signed in
     */
    onSaveEventChanges() {
      console.log('triggered');
      if (this.$refs.organizeEventForm.validate()) {
        const eventDetails = {
          id: this.id,
          name: this.eventName,
          location: this.location,
          description: this.description,
          maxParticipants: this.maxParticipants
        };

        this.$store.dispatch('updateEventData', eventDetails);
        this.editDialog = false;
      }
    }
  }
};
</script>

<style>
</style>
