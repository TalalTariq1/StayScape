import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const stats = [
    { value: '10,000+', label: 'Happy Travelers' },
    { value: '500+', label: 'Partner Hotels' },
    { value: '25+', label: 'Cities Covered' },
    { value: '4.9', label: 'Average Rating' }
  ];

  const values = [
    {
      icon: '◎',
      title: 'Simplicity first',
      description: 'We cut the clutter. Finding and booking a hotel should take seconds, not a PhD in travel planning.'
    },
    {
      icon: '◈',
      title: 'Honest pricing',
      description: 'No hidden fees revealed at checkout. The price you see is the price you pay — always.'
    },
    {
      icon: '◉',
      title: 'Curated quality',
      description: 'Every property on StayScape is handpicked and reviewed. We would rather have fewer great options than thousands of mediocre ones.'
    },
    {
      icon: '◐',
      title: 'Built for travelers',
      description: 'We are travelers ourselves. Every feature we build comes from a real frustration we have had with other booking platforms.'
    }
  ];

  const team = [
    {
      name: 'Talal Tariq',
      role: 'Founder & Full Stack Developer',
      description: 'Built StayScape from the ground up — from database schema to pixel-perfect UI. Passionate about clean code and seamless user experiences.'
    }
  ];

  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="about-eyebrow">About StayScape</p>
          <h1 className="about-hero-title">
            Travel should feel like an adventure, not a spreadsheet
          </h1>
          <p className="about-hero-subtitle">
            StayScape was built for one reason — booking a great hotel shouldn't be complicated. We believe the best part of any trip starts the moment you find the perfect place to stay.
          </p>
          <Link to="/hotels" className="about-cta-btn">Explore Hotels</Link>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="about-container">
          <div className="about-stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="about-stat-item">
                <p className="about-stat-value">{stat.value}</p>
                <p className="about-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="about-container about-story-grid">
          <div className="about-story-text">
            <p className="about-section-label">Our Story</p>
            <h2 className="about-section-title">Started with a bad booking experience</h2>
            <p className="about-body-text">
              It started with a frustrating evening spent on three different travel sites, each with confusing filters, surprise fees, and interfaces that felt designed to overwhelm rather than help.
            </p>
            <p className="about-body-text">
              StayScape was the answer — a clean, fast, honest hotel booking platform built with the traveler in mind. No dark patterns. No inflated prices. No endless upsells. Just great hotels, clearly presented, easy to book.
            </p>
            <p className="about-body-text">
              Today StayScape covers hotels across Pakistan's major cities and is expanding every week, with a focus on quality over quantity.
            </p>
          </div>
          <div className="about-story-visual">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
              alt="Luxury hotel"
              className="about-story-img"
            />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="about-container">
          <p className="about-section-label centered">What we stand for</p>
          <h2 className="about-section-title centered">Our values</h2>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <div key={i} className="about-value-card">
                <span className="about-value-icon">{v.icon}</span>
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="about-team">
        <div className="about-container">
          <p className="about-section-label centered">The people behind it</p>
          <h2 className="about-section-title centered">Built by one person, for everyone</h2>
          <div className="about-team-grid">
            {team.map((member, i) => (
              <div key={i} className="about-team-card">
                <div className="about-team-avatar">
                  {member.name.charAt(0)}
                </div>
                <h3 className="about-team-name">{member.name}</h3>
                <p className="about-team-role">{member.role}</p>
                <p className="about-team-desc">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-bottom-cta">
        <div className="about-container">
          <div className="about-cta-card">
            <h2 className="about-cta-title">Ready to find your next stay?</h2>
            <p className="about-cta-subtitle">Browse our curated collection of hotels across Pakistan.</p>
            <Link to="/hotels" className="about-cta-btn white">Browse Hotels</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
