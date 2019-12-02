import Layout from '../components/Layout'
import Bio from './member_sections/bio.js'
import fetch from 'isomorphic-fetch'

import Link from 'next/link'

const Member = ({ member }) => {
  return (
    <Layout>
      <section
        className="section"
        style={{ paddingTop: '1.5rem', minHeight: 'calc(100vh - 196px)' }}
      >
        <div className="container" style={{ marginTop: 0 }}>
          <Link href="/members">
            <a className="button is-rounded is-primary">
              <span className="icon" style={{ marginRight: '0.3rem' }}>
                <i className="fas fa-angle-double-left"></i>
              </span>
              Back to team
            </a>
          </Link>
          <br />
          <br />
          <Bio member={member} />
        </div>
      </section>
    </Layout>
  )
}

Member.getInitialProps = async query => {
  const res = await fetch(
    'http://platform.pennlabs.org/org/members/?format=json'
  )
  const members = await res.json()
  var member

  members.forEach(item => {
    if (item.url === query.query.name) {
      member = item
    }
  })

  if (member) return { member }
  else return {}
}

export default Member
