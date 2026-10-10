import { profile } from '../data/site.js'
import './Reviews.css'

export default function Reviews() {
  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <div className="review-panel">
          <div className="review-copy">
            <span className="eyebrow">Reviews</span>
            <h2 id="reviews-title" className="section-title">
              수강생 생생 후기는
              <br />
              블로그에서 확인하세요
            </h2>
            <p className="section-lead">
              강의 현장 사진, 수강생 후기, 실습 결과물을 네이버 블로그 ‘뷰티앤웰니스AI연구소’에 꾸준히 기록하고 있습니다.
            </p>
          </div>

          <div className="review-actions">
            <a className="blog-btn" href={profile.blog} target="_blank" rel="noopener noreferrer">
              <span className="blog-icon" aria-hidden="true">
                N
              </span>
              <span className="blog-label">
                <strong>네이버 블로그에서 후기 보기</strong>
                <span>blog.naver.com/ai_seach</span>
              </span>
              <span className="blog-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="insta-link" href={profile.instagram} target="_blank" rel="noopener noreferrer">
              인스타그램 @bw.ai_lab 에서 강의 소식 보기 ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
