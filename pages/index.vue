<<template>
  <div class="lk-root">
    <Container>
      <h1>Новости</h1>
      <ReplyList :offers="offers"/>
    </Container>
  </div>
</template>
<script>
import Container from '@/components/layout/Container'
import ReplyList from '@/components/ReplyList'

export default {
  layout: 'lk',
  components: {
    Container,
    ReplyList
  },

  computed: {
    offers() {
      const { offers } = this.$store.state.offers
      return offers
    }
  },
}
</script>
<style lang="scss">
.news {

}
</style>
