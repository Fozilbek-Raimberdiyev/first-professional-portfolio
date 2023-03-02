import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import subjectService from "../../services/subject.service";
import swal from "sweetalert2";
export const subjectStore = defineStore("subject", {
  state: () => ({
    list: [],
    subject: {},
    total: "",
  }),
  getters: {},
  actions: {
    async getList(limit, page, isForReference) {
      let res = await subjectService.getSubjects(limit, page, isForReference);
      this.list = res.data.subjects;
      this.total = res.data.total;
    },
    addSubject(body) {
      return subjectService.addSubject(body);
    },
    async getById(id) {
      let res = await subjectService.getById(id);
      this.subject = res.data;
    },
    updateSubject(body, id) {
      return subjectService.updateSubject(body, id);
    },
    async deleteSubjectAndQuestions(id) {
      let res = await subjectService.deleteSubjectAndQuestions(id);
      this.getList(10,5,true);
      // Toast.fire({
      //   icon: "success",
      //   title: res.data.message,
      // });
      // useToast().success(res.data.message);
    },
    async updateSubjectStatus(body) {
      let res = await subjectService.updateStatusSubject(body);
      this.list = res.data.subjects;
      this.total = res.data.total
    }
  },
});
