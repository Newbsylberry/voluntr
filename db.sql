--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: events; Type: TABLE; Schema: public; Owner: chrismccarthy; Tablespace: 
--

CREATE TABLE events (
    id integer NOT NULL,
    fb_id bigint,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255),
    timezone character varying(255),
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    location character varying(255),
    latitude double precision,
    longitude double precision,
    description character varying(255),
    organization_id integer
);


ALTER TABLE public.events OWNER TO chrismccarthy;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: chrismccarthy
--

CREATE SEQUENCE events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO chrismccarthy;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chrismccarthy
--

ALTER SEQUENCE events_id_seq OWNED BY events.id;


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: chrismccarthy; Tablespace: 
--

CREATE TABLE organizations (
    id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    fb_id bigint
);


ALTER TABLE public.organizations OWNER TO chrismccarthy;

--
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: chrismccarthy
--

CREATE SEQUENCE organizations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organizations_id_seq OWNER TO chrismccarthy;

--
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chrismccarthy
--

ALTER SEQUENCE organizations_id_seq OWNED BY organizations.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: chrismccarthy; Tablespace: 
--

CREATE TABLE schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO chrismccarthy;

--
-- Name: users; Type: TABLE; Schema: public; Owner: chrismccarthy; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    email character varying(255) DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying(255) DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying(255),
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip character varying(255),
    last_sign_in_ip character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO chrismccarthy;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: chrismccarthy
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO chrismccarthy;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chrismccarthy
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: chrismccarthy
--

ALTER TABLE ONLY events ALTER COLUMN id SET DEFAULT nextval('events_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: chrismccarthy
--

ALTER TABLE ONLY organizations ALTER COLUMN id SET DEFAULT nextval('organizations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: chrismccarthy
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: chrismccarthy
--

COPY events (id, fb_id, created_at, updated_at, name, timezone, start_time, end_time, location, latitude, longitude, description, organization_id) FROM stdin;
16	527486024055121	2014-10-29 14:11:15.460268	2014-10-29 14:11:15.460268	A sweet volunteer opportunity	America/New_York	2014-11-01 01:30:00	2014-11-01 13:00:00	Visit Syracuse	43.0428301720000022	-76.1506112893000022	\N	45
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrismccarthy
--

SELECT pg_catalog.setval('events_id_seq', 16, true);


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: chrismccarthy
--

COPY organizations (id, created_at, updated_at, fb_id) FROM stdin;
1	2014-10-14 18:51:43.091601	2014-10-14 18:51:43.091601	947264315301705
44	2014-10-15 18:05:20.537842	2014-10-15 18:05:20.537842	775956919109394
45	2014-10-17 13:44:12.309064	2014-10-17 13:44:12.309064	378258765657615
\.


--
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrismccarthy
--

SELECT pg_catalog.setval('organizations_id_seq', 45, true);


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: chrismccarthy
--

COPY schema_migrations (version) FROM stdin;
20141014172726
20141014184856
20141014184920
20141014185037
20141015230036
20141016013935
20141016014602
20141016014658
20141016020943
20141016021832
20141016021924
20141016023001
20141016023436
20141016023559
20141016132717
20141029140604
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: chrismccarthy
--

COPY users (id, email, encrypted_password, reset_password_token, reset_password_sent_at, remember_created_at, sign_in_count, current_sign_in_at, last_sign_in_at, current_sign_in_ip, last_sign_in_ip, created_at, updated_at) FROM stdin;
5	cmccarthy@chronicleme.com	$2a$10$LPw0XkVY3PeTwRxTvep8KePCofOI.A6Z9.lQJmv29U4/dnlLj2Gzq	\N	\N	\N	1	2014-10-16 16:28:18.256369	2014-10-16 16:28:18.256369	127.0.0.1	127.0.0.1	2014-10-16 16:27:52.549282	2014-10-16 16:28:18.257809
4	chris.s.mccarthy@gmail.com	$2a$10$pL2uEUsHlUm3eNyVjAZnRuBdtDU.yEhWsyN6Wxq82Wd9EcFQiwGRS	\N	\N	\N	48	2014-10-22 17:20:05.964404	2014-10-22 14:11:45.979536	127.0.0.1	127.0.0.1	2014-10-16 16:23:55.572407	2014-10-22 17:20:05.966104
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrismccarthy
--

SELECT pg_catalog.setval('users_id_seq', 5, true);


--
-- Name: events_pkey; Type: CONSTRAINT; Schema: public; Owner: chrismccarthy; Tablespace: 
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: chrismccarthy; Tablespace: 
--

ALTER TABLE ONLY organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: chrismccarthy; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_users_on_email; Type: INDEX; Schema: public; Owner: chrismccarthy; Tablespace: 
--

CREATE UNIQUE INDEX index_users_on_email ON users USING btree (email);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: chrismccarthy; Tablespace: 
--

CREATE UNIQUE INDEX index_users_on_reset_password_token ON users USING btree (reset_password_token);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: chrismccarthy; Tablespace: 
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- Name: public; Type: ACL; Schema: -; Owner: chrismccarthy
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM chrismccarthy;
GRANT ALL ON SCHEMA public TO chrismccarthy;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

