import showModal from 'discourse/lib/show-modal';
import { ajax } from 'discourse/lib/ajax';

let user = null;
export default {
  shouldRender(args, component) {
    const needsButton = component.currentUser && component.currentUser.get('staff') && (args.topic.get('assigned_to_user') === undefined || args.topic.get('assigned_to_user') === null) && component.siteSettings.assign_self ;
    user = component.currentUser;
    return needsButton && (!component.get('site.mobileView') || args.topic.get('isPrivateMessage'));
  },

  actions: {
    unassign(){

      this.set('topic.assigned_to_user', null);

      return ajax("/assign/unassign", {
        type: 'PUT',
        data: { topic_id: this.get('topic.id')}
      });
    },
    assign(){
      const container = Discourse.__container__;
       var model =  {
        topic: this.topic,
        username: user.get('username')
      }
      let controller = container.lookup('controller:assign-user');
      controller.set('model', model);
      controller.send('assign');
    }
  }
};
